import { IEntityBase } from '..';
import { IUser } from '../user';

export interface IPost extends IEntityBase {
  userId: number;
  title: string;
  body: string;
  user?: IUser;
}

export type PostPayload = Omit<IPost, 'id' | 'userId'>;

export type PostState = {
  posts?: IPost[] | null | undefined;
  post?: IPost | null | undefined;
};
