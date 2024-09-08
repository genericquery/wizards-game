/* tslint:disable */
/* eslint-disable */
import { MagicType } from '../models/magic-type';
import { MovementAxis } from '../models/movement-axis';
import { ObjectPosition } from '../models/object-position';
import { SideType } from '../models/side-type';
export interface Player {
  eyeDirection?: MovementAxis;
  healthPoints?: number;
  id?: string;
  isDefenced?: boolean;
  isFillObelisk?: boolean;
  isOverPowered?: boolean;
  magicType?: MagicType;
  movementAxis?: MovementAxis;
  name?: string | null;
  position?: ObjectPosition;
  side?: SideType;
  spawnPosition?: ObjectPosition;
}
