import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getCommentsByPost } from 'store/actions/comments';

import { IdentityKey, IHooksReturnState, InitialState } from 'utils/types';
import { CommentState, IComment } from 'utils/types/comment';

type UseComment = {
  autoFetch?: boolean;
};

export default function useGetCommentsByPost(
  postId: IdentityKey,
  options: UseComment = { autoFetch: true }
): IHooksReturnState<CommentState, IdentityKey> {
  const dispatch = useDispatch<AppDispatch<IComment>>();

  const { data, isLoading, error } = useSelector<RootState, InitialState<CommentState>>(
    (state) => state.comments
  );

  useEffect(() => {
    if (options?.autoFetch && postId) dispatch(getCommentsByPost(postId));
  }, [dispatch, options.autoFetch, postId]);

  const reFetch = () => dispatch(getCommentsByPost(postId));

  return useMemo(() => ({ data, isLoading, error, reFetch: reFetch }), [data]);
}
