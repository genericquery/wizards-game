/* tslint:disable */
/* eslint-disable */
import { MagicType } from '../models/magic-type';
import { ObjectPosition } from '../models/object-position';
import { SideType } from '../models/side-type';
import { Vector } from '../models/vector';
export interface Player {
  eyeDirection?: Vector;
  healthPoints?: number;
  id?: string;
  isDefenced?: boolean;
  isOverPowered?: boolean;
  magicType?: MagicType;
  name?: string | null;
  position?: ObjectPosition;
  side?: SideType;
  vector?: Vector;
}
