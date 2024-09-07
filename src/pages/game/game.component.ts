import { AssetsLoader } from '@/lib/assets-loader';
import { Pawn, PawnType } from '@/lib/pawn';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Application, Assets } from 'pixi.js';
import { GameHubService } from './game-hub.service';

@Component({
  selector: 'wiz-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  renderer2 = inject(Renderer2);
  assetsLoader = inject(AssetsLoader);
  gameHubService = inject(GameHubService);

  pixiApp = new Application();

  players = signal<Pawn[]>([]);

  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLDivElement>;

  async ngOnInit(): Promise<void> {
    this.gameHubService.connect();
    await this.assetsLoader.loadAssets();
    this.gameHubService.connect();
    this.players.set([new Pawn(PawnType.Flame)]);
    this.players().forEach((x) => {
      console.log(x.sprite);
      x.sprite.anchor.x = 1;
      x.sprite.scale.x *= -1;
      this.pixiApp.stage.addChild(x.sprite);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.pixiApp = new Application();
    await this.pixiApp.init({ background: '#1099bb', resizeTo: window });
    this.renderer2.appendChild(
      this.gameCanvas.nativeElement,
      this.pixiApp?.canvas
    );
  }

  ngOnDestroy(): void {
    this.gameHubService.disconnect();
  }

  drawPlayer(pawn: Pawn) {
    pawn.sprite;
  }
}
