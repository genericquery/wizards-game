import { Sprite } from 'pixi.js';
import { Bullet, MagicType } from '../api/models';
import { getMagicType } from '../shared';

export class BulletPawn {
  sprite: Sprite;
  constructor(bullet: Bullet) {
    const force = getMagicType(bullet.magicType as MagicType);
    this.sprite = Sprite.from(`strike_${force}`);
  }

  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
