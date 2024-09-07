import { Injectable } from '@angular/core';
import { Assets } from 'pixi.js';

@Injectable({ providedIn: 'root' })
export class AssetsLoader {
  assetsToLoad = [
    `sprites/obelisk.svg`,
    `sprites/strike_air.svg`,
    `sprites/strike_earth.svg`,
    `sprites/strike_flame.svg`,
    `sprites/strike_water.svg`,
    `sprites/wizard_air.svg`,
    `sprites/wizard_earth.svg`,
    `sprites/wizard_flame.svg`,
    `sprites/wizard_water.svg`,
  ];

  loadAssets() {
    this.assetsToLoad.forEach(async (sprite) => {
      await Assets.load(sprite);
    });
  }
}
