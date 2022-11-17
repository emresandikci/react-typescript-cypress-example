import { combineReducers } from 'redux';
import comments from './comment';
import posts from './post';

const rootReducer = combineReducers({
  comments,
  posts,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
