import { Sprite } from 'pixi.js';
import { MagicType, Player } from '../api/models';

export class Pawn {
  sprite: Sprite;

  constructor(public player: Player) {
    let force = null;

    switch (player.magicType) {
      case MagicType.$0:
        force = 'flame';
        break;
      case MagicType.$1:
        force = 'air';
        break;
      case MagicType.$2:
        force = 'earth';
        break;
      case MagicType.$3:
        force = 'water';
        break;
    }
    this.sprite = Sprite.from(`wizard_${force}`);

    // this.sprite.anchor.set(0.5);
    this.sprite.label = player.id as string;
    this.sprite.x = player.position?.x as number;
    this.sprite.y = player.position?.y as number;
  }

  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
  }
}

export enum PawnType {
  Air = 'air',
  Earth = 'earth',
  Flame = 'flame',
  Water = 'water',
}
