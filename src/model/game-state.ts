import { Bullet, Obelisk, Player } from '../api/models';
import { MagicType, Position, Side, Vector } from './api.model';

export interface GameState {
  id: string;
  isMatchStarted: boolean;
  players: Record<string, Player>;
  bullets: Record<string, Bullet>;
  obelisk: Obelisk;
  winner: number | null;
}

export interface GameBulletState {
  id: string;
  position: {
    left: Position;
    right: Position;
  };
  magicType: MagicType;
  side: Side;
  vector: Vector;
}

export interface GamePlayerState {
  id: string;
  name: string;
  position: {
    left: Position;
    right: Position;
  };
  magicType: MagicType;
  side: Side;
  vector: Vector;
  healthPoints: number;
  isDefenced: boolean;
  isOverPowered: boolean;
}
