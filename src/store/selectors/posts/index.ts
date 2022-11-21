import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';
import { IPost } from 'utils/types/post';

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
        (post: IPost) =>
          post?.user?.name.toLocaleLowerCase().includes(keyword.toString().toLocaleLowerCase()) ||
          post.body.toLocaleLowerCase().includes(keyword.toString().toLocaleLowerCase()) ||
          post.userId.toString().toLocaleLowerCase() == keyword.toString().toLocaleLowerCase() ||
          post.title.toLocaleLowerCase().includes(keyword.toString().toLocaleLowerCase())
      );
    })
  );
