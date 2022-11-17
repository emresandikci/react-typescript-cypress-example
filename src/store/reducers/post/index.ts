import { postTypes } from 'store/actionTypes';
import { Action, InitialState } from 'utils/types';
import { IPost } from 'utils/types/post';

const { GET_POSTS, GET_POSTS_SUCCEDED, GET_POSTS_FAILED } = postTypes;

const initialState: InitialState<IPost[]> = {
  isLoading: false,
  error: null,
  data: [],
};

export default function postReducer(state = initialState, action: Action<IPost[]>) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCEDED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      break;
  }
  return state;
}
