import { AnyAction } from 'redux';
import { postTypes } from 'store/actionTypes';
import { InitialState } from 'utils/types';
import { PostState } from 'utils/types/post';

const { GET_POSTS, GET_POSTS_SUCCEDED, GET_POSTS_FAILED } = postTypes;

const initialState: InitialState<PostState> = {
  isLoading: false,
  error: null,
  data: {
    posts: null,
    post: null,
  },
};

export default function postReducer(
  state = initialState,
  action: AnyAction
): InitialState<PostState> {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCEDED:
      return {
        ...state,
        data: {
          ...state.data,
          posts: action.payload,
        },
        isLoading: false,
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
