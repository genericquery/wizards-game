/* tslint:disable */
/* eslint-disable */
import { Bullet } from '../models/bullet';
import { Player } from '../models/player';
export interface GameMatch {
  bullets?: ({
[key: string]: Bullet;
}) | null;
  id?: string;
  isMatchStarted?: boolean;
  players?: ({
[key: string]: Player;
}) | null;
}
