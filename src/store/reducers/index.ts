import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import users from './users';

const rootReducer = combineReducers({
  comments,
  posts,
  users,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
