/* tslint:disable */
/* eslint-disable */
import { MagicType } from '../models/magic-type';
import { SideType } from '../models/side-type';
export interface AddPlayerDto {
  magicType?: MagicType;
  matchId?: string;
  playerName?: string | null;
  sideType?: SideType;
}
