export interface SpaceAttributes {
  readonly id: number;
  trackerPresent: boolean;
  onPath: boolean;
  gemCount: number;
  gemIncrement: number;
  readonly createdAt?: Date;
  readonly updatedDate?: Date;

}
