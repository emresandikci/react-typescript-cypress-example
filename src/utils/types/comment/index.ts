import { IEntityBase } from '..';

export interface IComment extends IEntityBase {
  postId: number;
  name: string;
  email: string;
  body: string;
  tags?: string[];
}
