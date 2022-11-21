import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';
import { IComment } from 'utils/types/comment';

const selectComments = (state: RootState) => state.comments.data;
const filterPureComments = (state: IComment[]) => state?.filter((comment) => !comment.parentId);
const filterRepliedComments = (state: IComment[]) => state?.filter((comment) => comment.parentId);
const useCommentsSelector = () =>
  useSelector(
    createSelector(selectComments, (state) => ({
      comments: filterPureComments(state?.comments as IComment[])?.map((comment) => ({
        ...comment,
        replies: filterRepliedComments(state?.comments as IComment[])?.filter(
          (filter) => filter.parentId == comment.id
        ),
      })),
      replies: filterRepliedComments(state?.comments as IComment[]),
      totalReplies: filterRepliedComments(state?.comments as IComment[])?.length,
      totalComments: filterPureComments(state?.comments as IComment[])?.length,
    }))
  );

export default useCommentsSelector;
