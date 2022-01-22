export interface UserAttributes {
  readonly id: number;
  username: string;
  password: string;
  player?: number;
  isActive?: boolean;
  isLeading?: boolean;

}
