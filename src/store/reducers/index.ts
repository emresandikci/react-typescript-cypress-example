import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';

const rootReducer = combineReducers({
  comments,
  posts,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
