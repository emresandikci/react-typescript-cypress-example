import { IEntityBase } from '..';

export interface IPost extends IEntityBase {
  userId: number;
  title: string;
  body: string;
}
