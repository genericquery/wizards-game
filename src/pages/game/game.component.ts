import { AssetsLoader } from '@/lib/assets-loader';
import { Pawn, PawnType } from '@/lib/pawn';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Application, Assets } from 'pixi.js';

@Component({
  selector: 'wiz-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, AfterViewInit {
  renderer2 = inject(Renderer2);
  assetsLoader = inject(AssetsLoader);

  pixiApp = new Application();

  players = signal<Pawn[]>([new Pawn(PawnType.Air)]);

  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLDivElement>;

  async ngOnInit(): Promise<void> {
    this.assetsLoader.loadAssets();
  }

  async ngAfterViewInit(): Promise<void> {
    this.pixiApp = new Application();
    await this.pixiApp.init({ background: '#1099bb', resizeTo: window });
    this.renderer2.appendChild(
      this.gameCanvas.nativeElement,
      this.pixiApp?.canvas
    );
  }
}
