import { Injectable } from '@angular/core';
import { Assets } from 'pixi.js';

@Injectable({ providedIn: 'root' })
export class AssetsLoader {
  assetsToLoad = [
    { alias: 'obelisk', src: 'sprites/obelisk.svg' },
    { alias: 'strike_air', src: 'sprites/strike_air.svg' },
    { alias: 'strike_earth', src: 'sprites/strike_earth.svg' },
    { alias: 'strike_flame', src: 'sprites/strike_flame.svg' },
    { alias: 'strike_water', src: 'sprites/strike_water.svg' },
    { alias: 'wizard_air', src: 'sprites/wizard_air.svg' },
    { alias: 'wizard_earth', src: 'sprites/wizard_earth.svg' },
    { alias: 'wizard_flame', src: 'sprites/wizard_flame.svg' },
    { alias: 'wizard_water', src: 'sprites/wizard_water.svg' },
  ];

  async loadAssets() {
    await Assets.load(this.assetsToLoad);
  }
}
