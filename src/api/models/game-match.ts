/* tslint:disable */
/* eslint-disable */
import { Bullet } from '../models/bullet';
import { Obelisk } from '../models/obelisk';
import { Player } from '../models/player';
import { SideType } from '../models/side-type';
export interface GameMatch {
  bullets?: ({
[key: string]: Bullet;
}) | null;
  created?: string;
  id?: string;
  isMatchStarted?: boolean;
  obelisk?: Obelisk;
  players?: ({
[key: string]: Player;
}) | null;
  winner?: SideType;
}
