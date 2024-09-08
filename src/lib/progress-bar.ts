import { ProgressBar } from '@pixi/ui';
import { Graphics } from 'pixi.js';
export class AppProgressBar {
  bar: ProgressBar;

  constructor() {
    const fillColor = '#00b1dd';
    const borderColor = '#FFFFFF';
    const backgroundColor = '#fe6048';

    const bg = new Graphics()
      .beginFill(borderColor)
      .drawRoundedRect(0, 0, 450, 38, 25)
      .beginFill(backgroundColor)
      .drawRoundedRect(3, 3, 444, 32, 25);

    const fill = new Graphics()
      .beginFill(borderColor)
      .drawRoundedRect(0, 0, 450, 38, 25)
      .beginFill(fillColor)
      .drawRoundedRect(3, 3, 444, 32, 25);

    this.bar = new ProgressBar({
      bg,
      fill,
    });
  }

  setProgress(progress: number) {
    this.bar.progress = progress;
  }
}
