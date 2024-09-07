import { Sprite } from 'pixi.js';

export class Pawn {
  public x: number = 0;
  public y: number = 0;

  public hp: number = 10;
  public sprite: Sprite;

  constructor(public type: PawnType) {
    this.sprite = Sprite.from(`wizard_${this.type}`);
  }
}

export enum PawnType {
  Air = 'air',
  Earth = 'earth',
  Flame = 'flame',
  Water = 'water',
}
