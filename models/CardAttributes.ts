export interface CardAttributes {
  readonly id: number;
  suit: string;
  number: number;
  movement: number;
  special?: string;
  readonly createdAt?: Date;
  readonly updatedDate?: Date;
}
