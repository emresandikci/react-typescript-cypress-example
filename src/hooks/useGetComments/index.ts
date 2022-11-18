import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getComments } from 'store/actions/comments';

import { InitialState } from 'utils/types';
import { IComment } from 'utils/types/comment';

type UseComment = {
  autoFetch?: boolean;
};

export default function useGetComments(options: UseComment = { autoFetch: true }) {
  const dispatch = useDispatch<AppDispatch<IComment>>();

  const { data, isLoading, error } = useSelector<RootState, InitialState<IComment[]>>(
    (state) => state.posts
  );

  useEffect(() => {
    if (options?.autoFetch) dispatch(getComments());
  }, [dispatch, options]);

  return { comments: data, isLoading, error };
}
