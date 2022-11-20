import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectPosts = (state: RootState) => state.posts.data?.posts;

export const usePostFilterSelector = (keyword: string | number) =>
  useSelector(
    createSelector(selectPosts, (posts) => {
      return posts?.filter(
        (post) =>
          post.body.toLocaleLowerCase().includes(keyword.toString()) ||
          post.userId.toString().toLocaleLowerCase() == keyword.toString() ||
          post.title.toLocaleLowerCase().includes(keyword.toString())
      );
    })
  );
