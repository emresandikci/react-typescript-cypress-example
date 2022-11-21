import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectUsersPosts = (state: RootState) => ({
  posts: state.posts.data?.posts,
  users: state.users.data?.users,
});

export const usePostFilterSelector = (keyword: string | number) =>
  useSelector(
    createSelector(selectUsersPosts, ({ posts, users }) => {
      const mappedPosts = posts?.map((post) => {
        return {
          ...post,
          user: users?.find((user) => user.id == post.userId),
        };
      });
      return mappedPosts?.filter(
        (post) =>
          post.body.toLocaleLowerCase().includes(keyword.toString()) ||
          post.userId.toString().toLocaleLowerCase() == keyword.toString() ||
          post.title.toLocaleLowerCase().includes(keyword.toString())
      );
    })
  );
