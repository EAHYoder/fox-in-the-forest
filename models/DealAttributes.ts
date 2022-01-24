export interface DealAttributes {
  readonly id: number;
  undealtCards: Array<number>;
  player0Hand: number;
  player1Hand: number;
  decree: number;
  readonly createdAt?: Date;
  readonly updatedDate?: Date;
}
