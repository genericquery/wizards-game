export enum Side {
  Greed,
  Red,
}

export enum Vector {
  X,
  Y,
  XNegative,
  YNegative,
}

export enum MagicType {
  Fire,
  Air,
  Earth,
  Water,
}

export interface Position {
  x: number;
  y: number;
}

export interface AddPlayerDto {
  matchId: string;
  playerName: string;
  sideType: Side;
  magicType: MagicType;
}
