import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getPosts } from 'store/actions/posts';
import { InitialState } from 'utils/types';
import { IPost } from 'utils/types/post';

type UsePost = {
  autoFetch?: boolean;
};

export default function useGetPosts(options: UsePost = { autoFetch: true }): InitialState<IPost[]> {
  const dispatch = useDispatch<AppDispatch<IPost>>();

  const { data, isLoading, error } = useSelector<RootState, InitialState<IPost[]>>(
    (state) => state.posts
  );

  useEffect(() => {
    if (options?.autoFetch) dispatch(getPosts());
  }, [options?.autoFetch, dispatch]);

  return useMemo(() => ({ data, isLoading, error }), [data]);
}
