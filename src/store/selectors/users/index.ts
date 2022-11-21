import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'store';

const selectUsers = (state: RootState) => state.users.data;

export const useUsersSelector = () =>
  useSelector(createSelector(selectUsers, (state) => state?.users));
