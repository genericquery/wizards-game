/* tslint:disable */
/* eslint-disable */
import { MagicType } from '../models/magic-type';
import { MovementAxis } from '../models/movement-axis';
import { ObjectPosition } from '../models/object-position';
import { SideType } from '../models/side-type';
export interface Bullet {
  id?: string;
  magicType?: MagicType;
  movementAxis?: MovementAxis;
  position?: ObjectPosition;
  side?: SideType;
}
