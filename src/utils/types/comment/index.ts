import { IEntityBase } from '..';

export interface IComment extends IEntityBase {
  id: number;
  postId?: number | null;
  name?: string | null;
  email?: string | null;
  body?: string | null;
  tags?: string[] | null;
  parentId?: number | null;
}

export type CommentPayload = Omit<IComment, 'id'>;

export type CommentState = {
  comments?: IComment[] | null | undefined;
  comment?: IComment | null | undefined;
};
