import { IEntityBase } from '..';

export interface IComment extends IEntityBase {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  tags?: string[];
  parentId?: number;
}

export type CommentPayload = Omit<IComment, 'name' | 'email' | 'id'>;

export type CommentState = {
  comments?: IComment[] | null | undefined;
  comment?: IComment | null | undefined;
};
