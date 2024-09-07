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
import { Application, Assets, Container, Sprite } from 'pixi.js';
import { GameHubService } from './game-hub.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { currentPlayerIdKey, LocalStorage } from '../../shared';
import { GameService } from '../../api/services';
import { take } from 'rxjs';
import { AsyncPipe, DOCUMENT, JsonPipe } from '@angular/common';
import { Vector } from '../../api/models';

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

  state$ = this.gameHubService.state$;

  @Input() gameId!: string;

  playersContainer = new Container();
  players: Record<string, Pawn> = {};

  pixiApp = new Application();

  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLDivElement>;

  async ngOnInit(): Promise<void> {
    this.gameHubService.connect();
    await this.assetsLoader.loadAssets();
    setTimeout(() => {
      this.gameHubService.GetPlayerState(this.playerId as string);
    }, 1000);
    this.pixiApp.stage.addChild(this.playersContainer);
    this.gameHubService.state$
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((gameState) => {
        if (gameState?.players) {
          Object.values(gameState?.players).forEach((x) => {
            const playerId = x.id as string;
            let playerSprite = this.playersContainer.getChildByLabel(playerId);
            if (!this.playersContainer.getChildByLabel(playerId)) {
              this.players[playerId] = new Pawn(x);
              playerSprite = this.playersContainer.addChild(
                this.players[playerId].sprite
              );
            }
            this.players[playerId].setPosition(
              x.position?.x as number,
              x.position?.y as number
            );
          });
        }
      });
  }

  async ngAfterViewInit(): Promise<void> {
    this.pixiApp = new Application();
    await this.pixiApp.init({ background: '#1099bb', resizeTo: window });
    this.renderer2.appendChild(
      this.gameCanvas.nativeElement,
      this.pixiApp?.canvas
    );

    this.document.addEventListener('keydown', (event: KeyboardEvent) => {
      let vector: Vector | undefined = undefined;
      switch (event.key) {
        case 'd':
        case 'D':
          vector = Vector.$0;
          break;

        case 'w':
        case 'W':
          vector = Vector.$3;
          break;

        case 'a':
        case 'A':
          vector = Vector.$2;
          break;

        case 's':
        case 'S':
          vector = Vector.$1;
          break;
      }

      console.log({ vector: vector });
      this.gameHubService.MovePlayer(vector);
    });
  }

  ngOnDestroy(): void {
    this.gameHubService.disconnect();
  }
}
