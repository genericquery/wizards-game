export class Pawn {
  public x: number = 0;
  public y: number = 0;

  public hp: number = 10;

  constructor(public type: PawnType) {}
}

export enum PawnType {
  Air = 'air',
  Earth = 'earth',
  Flame = 'flame',
  Water = 'water',
}
