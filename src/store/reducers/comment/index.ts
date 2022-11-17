import { commentTypes } from 'store/actionTypes';
import { Action, InitialState } from 'utils/types';
import { IComment } from 'utils/types/comment';

const { GET_COMMENTS, GET_COMMENTS_SUCCEDED, GET_COMMENTS_FAILED } = commentTypes;

const initialState: InitialState<IComment[]> = {
  isLoading: false,
  error: null,
  data: [],
};

export default function commentReducer(state = initialState, action: Action<IComment[]>) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COMMENTS_SUCCEDED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_COMMENTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
  }
  return state;
}
