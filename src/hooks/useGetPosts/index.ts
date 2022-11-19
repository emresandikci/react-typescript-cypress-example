import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { getPosts } from 'store/actions/posts';
import { IHooksReturnState, InitialState } from 'utils/types';
import { IPost } from 'utils/types/post';

type UsePost = {
  autoFetch?: boolean;
};

export default function useGetPosts(
  options: UsePost = { autoFetch: true }
): IHooksReturnState<IPost[], any> {
  const dispatch = useDispatch<AppDispatch<IPost>>();

  const { data, isLoading, error } = useSelector<RootState, InitialState<IPost[]>>(
    (state) => state.posts
  );

  useEffect(() => {
    if (options?.autoFetch) dispatch(getPosts());
  }, [options?.autoFetch, dispatch]);

  const reFetch = () => dispatch(getPosts());

  return useMemo(() => ({ data, isLoading, error, reFetch: reFetch }), [data]);
}
