import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectComments = (state: RootState) => state.comments.data;

const useCommentsSelector = () =>
  useSelector(createSelector(selectComments, (state) => state?.comments));

export default useCommentsSelector;
