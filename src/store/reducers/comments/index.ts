import { AnyAction } from 'redux';
import { commentTypes } from 'store/actionTypes';
import { InitialState } from 'utils/types';
import { CommentState } from 'utils/types/comment';

const {
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_SUCCEDED,
  GET_COMMENTS_BY_POST_ID_FAILED,
  ADD_COMMENT,
  ADD_COMMENT_SUCCEDED,
  ADD_COMMENT_FAILED,
} = commentTypes;

const initialState: InitialState<CommentState> = {
  isLoading: false,
  error: null,
  data: {
    comments: null,
    comment: null,
  },
};

export default function commentsByPostReducer(
  state = initialState,
  action: AnyAction
): InitialState<CommentState> {
  switch (action.type) {
    case GET_COMMENTS_BY_POST_ID:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COMMENTS_BY_POST_ID_SUCCEDED:
      return {
        ...state,
        data: {
          ...state.data,
          comments: action.payload,
        },
        isLoading: false,
      };
    case GET_COMMENTS_BY_POST_ID_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_COMMENT_SUCCEDED:
      return {
        ...state,
        data: {
          ...state.data,
          comment: action.payload,
        },
        isLoading: false,
      };
    case ADD_COMMENT_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
