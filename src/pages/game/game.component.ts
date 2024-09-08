import { AssetsLoader } from '@/lib/assets-loader';
import { Pawn, PawnType } from '@/lib/pawn';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Application, Assets, BitmapText, Container, Sprite } from 'pixi.js';
import { GameHubService } from './game-hub.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { currentPlayerIdKey, getMagicType, LocalStorage } from '../../shared';
import { GameService } from '../../api/services';
import { interval, take } from 'rxjs';
import { AsyncPipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Bullet, MagicType, SideType } from '../../api/models';
import { BulletPawn } from '@/lib/bullet';
import { ProgressBar } from '@pixi/ui';
import { AppProgressBar } from '@/lib/progress-bar';

@Component({
  selector: 'wiz-game',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  renderer2 = inject(Renderer2);
  assetsLoader = inject(AssetsLoader);
  gameHubService = inject(GameHubService);
  gameService = inject(GameService);
  destoryRef = inject(DestroyRef);
  document = inject(DOCUMENT);
  localStorage = inject(LocalStorage);
  playerId = this.localStorage.getItem(currentPlayerIdKey);
  obeliskArea?: Sprite;
  axisX = 0;
  axisY = 0;

  state$ = this.gameHubService.state$;

  @Input() gameId!: string;

  playersContainer = new Container();
  bulletsContainer = new Container();
  players: Record<string, Pawn> = {};

  pixiApp = new Application();

  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLDivElement>;
  bullets: Record<string, BulletPawn> = {};
  obelisk?: Sprite;
  bg?: Sprite;
  obeliskProgress?: ProgressBar;
  progressBar?: AppProgressBar;
  progressText?: BitmapText;
  winText?: BitmapText;

  async ngOnInit(): Promise<void> {
    this.gameHubService.connect();
    await this.assetsLoader.loadAssets();
    setTimeout(() => {
      this.gameHubService.GetPlayerState(this.playerId as string);
    }, 1000);
  }

  getWinnerCommand(winner: number | undefined) {
    return winner === 0 ? 'зеленая' : 'красная';
  }

  private getProgressText(progress: number) {
    return `До заряда обелиска осталось: ${progress}`;
  }

  async ngAfterViewInit(): Promise<void> {
    this.pixiApp = new Application();

    await this.pixiApp.init({
      background: '#ffffff',
      autoDensity: true,
      width: 1600,
      height: 900,
    });
    this.renderer2.appendChild(
      this.gameCanvas.nativeElement,
      this.pixiApp?.canvas
    );
    setTimeout(() => {
      this.bg = Sprite.from('map');
      this.bg.width = this.pixiApp.screen.width;
      this.bg.height = this.pixiApp.screen.height;
      this.progressBar = new AppProgressBar();
      this.progressText = new BitmapText({ text: this.getProgressText(0) });
      this.progressText.x = 600;
      this.progressText.y = 250;
      this.obeliskProgress = new ProgressBar({
        bg: 'map',
        fill: 'green',
        progress: 0.7,
      });
      this.progressBar.bar.x = 500;
      this.progressBar.bar.y = 200;
      this.obeliskArea = Sprite.from('obelisk_area');
      this.obeliskArea.y = 469;
      this.obeliskArea.x = 470;
      this.obeliskArea.width = 660;
      this.obeliskArea.height = 246;
      this.pixiApp.stage.addChild(this.bg);
      this.pixiApp.stage.addChild(this.obeliskArea);
      this.pixiApp.stage.addChild(this.progressText);
      // this.pixiApp.stage.addChild(this.obeliskProgress);
      this.pixiApp.stage.addChild(this.playersContainer);
      this.pixiApp.stage.addChild(this.bulletsContainer);
      this.gameHubService.state$
        .pipe(takeUntilDestroyed(this.destoryRef))
        .subscribe((gameState) => {
          if (gameState?.players) {
            Object.values(gameState?.players).forEach((x) => {
              const playerId = x.id as string;
              let playerSprite =
                this.playersContainer.getChildByLabel(playerId);
              if (!this.playersContainer.getChildByLabel(playerId)) {
                this.players[playerId] = new Pawn(x);
                playerSprite = this.playersContainer.addChild(
                  this.players[playerId].container
                );
                //   playerSprite.width = x.position?.width as number;
                //   playerSprite.height = x.position?.height as number;
              }
              this.players[playerId].setPosition(
                x.position?.x as number,
                x.position?.y as number
              );
              this.players[playerId].setDefenced(x.isDefenced);
              if (x.eyeDirection?.x !== 0) {
                this.players[playerId].setEyeDirection(
                  x.eyeDirection?.x as number
                );
              }
            });
          }

          if (gameState?.bullets) {
            Object.keys(gameState.bullets).forEach((bulletId) => {
              const bullet = gameState.bullets[bulletId];
              Sprite.from(
                `strike_${getMagicType(bullet.magicType as MagicType)}`
              );
              if (!this.bullets[bulletId]) {
                this.bullets[bulletId] = new BulletPawn(bullet);
                this.bullets[bulletId].sprite.width = bullet.position
                  ?.width as number;
                this.bullets[bulletId].sprite.height = bullet.position
                  ?.height as number;
                this.bulletsContainer.addChild(this.bullets[bulletId].sprite);
              }

              this.bullets[bulletId].setPosition(
                bullet.position?.x as number,
                bullet.position?.y as number
              );
            });

            Object.keys(this.bullets).forEach((bulletId) => {
              if (!gameState.bullets[bulletId]) {
                this.bulletsContainer.removeChild(
                  this.bullets[bulletId].sprite
                );
                delete this.bullets[bulletId];
              }
            });
            if (this.progressText) {
              this.progressText.text = this.getProgressText(
                gameState.obelisk.value ?? 0
              );
            }
          }

          if (gameState?.obelisk) {
            this.obelisk = Sprite.from('obelisk');
            this.obelisk.x = gameState.obelisk.position?.x as number;
            this.obelisk.y = gameState.obelisk.position?.y as number;
            this.obelisk.width = gameState.obelisk.position?.width as number;
            this.obelisk.height = gameState.obelisk.position?.height as number;
            this.obelisk.label = 'obelisk';
            //   this.obelisk.anchor.set(1, 1);

            if (!this.pixiApp.stage.getChildByLabel('obelisk')) {
              this.pixiApp.stage.addChild(this.obelisk);
            }
          }

          if (typeof gameState?.winner === 'number') {
            this.winText = new BitmapText({
              text: `Победила ${this.getWinnerCommand(
                gameState?.winner ?? 0
              )} команда`,
              style: {
                fontSize: 55,
                align: 'center',
              },
            });

            this.winText.x = 400;
            this.winText.y = 200;
            this.pixiApp.stage.addChild(this.winText);
          }
        });
    }, 100);
    interval(10)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(() => {
        if (this.axisX !== 0 || this.axisY !== 0) {
          this.gameHubService.MovePlayer({ x: this.axisX, y: this.axisY });
        }
      });

    this.document.addEventListener('keyup', (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'd':
        case 'в':
          this.axisX = 0;
          break;

        case 'w':
        case 'ц':
          this.axisY = 0;
          break;

        case 'a':
        case 'ф':
          this.axisX = 0;
          break;

        case 's':
        case 'ы':
          this.axisY = 0;
          break;
        case 'o':
        case 'щ':
          this.gameHubService.DeffecncePlayer(false);
          break;
        case 'p':
        case 'з':
          this.gameHubService.FillObelisk(false);
          break;
      }
    });

    this.document.addEventListener('keypress', (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'i':
        case 'ш':
          this.gameHubService.Shoot();
          break;
        case 'o':
        case 'щ':
          this.gameHubService.DeffecncePlayer(true);
          break;
        case 'p':
        case 'з':
          this.gameHubService.FillObelisk(true);
          break;
      }
    });

    this.document.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'd':
        case 'в':
          this.axisX = 1;
          break;

        case 'w':
        case 'ц':
          this.axisY = -1;
          break;

        case 'a':
        case 'ф':
          this.axisX = -1;
          break;

        case 's':
        case 'ы':
          //   vector = Vector.$1;
          this.axisY = 1;
          break;
      }

      //   this.gameHubService.MovePlayer(vector);
    });
  }

  isGameCreatedByCurrentUser() {
    return this.gameHubService.isGameCreatedByCurrentUser(this.gameId);
  }

  ngOnDestroy(): void {
    this.gameHubService.disconnect();
  }
}
