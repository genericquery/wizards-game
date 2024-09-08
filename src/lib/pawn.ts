import { BitmapText, Container, Ellipse, Graphics, Sprite } from 'pixi.js';
import { MagicType, Player } from '../api/models';
import { getMagicType } from '../shared';

export class Pawn {
  container: Container;
  eyeDirection = 0;
  sprite: Sprite;
  shield: Sprite;
  playerName: BitmapText;

  constructor(public player: Player) {
    let force = getMagicType(player.magicType as MagicType);
    this.container = new Container();
    this.sprite = Sprite.from(`wizard_${force}`);
    const shieldCords = this.getShieldCords(player);
    this.shield = Sprite.from(`wizard_${force}_shield`);

    this.shield.x = -100;
    this.shield.y = 25;
    this.shield.width = 200;
    this.shield.height = 68;
    this.playerName = new BitmapText({
      text: player.name as string,
      style: {
        fill: this.player.side === 0 ? 'green' : 'red',
      },
    });
    this.playerName.y = this.container.height - 25;
    this.playerName.x = -25;

    // this.sprite.anchor.set(0.5);
    this.container.label = player.id as string;
    this.container.x = player.position?.x as number;
    this.container.y = player.position?.y as number;
    this.container.width = player.position?.width as number;
    this.container.height = player.position?.height as number;
    this.sprite.width = player.position?.width as number;
    this.sprite.height = player.position?.height as number;

    this.container.addChild(this.shield);
    this.container.addChild(this.sprite);
    this.container.addChild(this.playerName);
  }

  setPosition(x: number, y: number) {
    this.container.x = x;
    this.container.y = y;
  }

  setEyeDirection(eyeDirection: number) {
    if (eyeDirection !== 0 && eyeDirection !== this.eyeDirection) {
      this.sprite.anchor.x = 0.5;
      this.sprite.scale.x *= -1;
      this.eyeDirection = eyeDirection;
    }
  }

  getShieldCords(player: Player) {
    return {
      x: (player.position?.width as number) / 2 - 100,
      y: (player.position?.height as number) / 2 - 34,
    };
  }

  setDefenced(isDefenced: boolean | undefined) {
    this.shield.visible = isDefenced ?? false;
  }
}

export enum PawnType {
  Air = 'air',
  Earth = 'earth',
  Flame = 'flame',
  Water = 'water',
}
