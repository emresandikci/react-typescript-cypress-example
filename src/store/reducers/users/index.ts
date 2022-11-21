import { AnyAction } from 'redux';
import { userTypes } from 'store/actionTypes';
import { InitialState } from 'utils/types';
import { UserState } from 'utils/types/user';

const { GET_USERS, GET_USERS_SUCCEDED, GET_USERS_FAILED } = userTypes;

const initialState: InitialState<UserState> = {
  isLoading: false,
  error: null,
  data: {
    users: null,
    user: null,
  },
};

export default function userReducer(
  state = initialState,
  action: AnyAction
): InitialState<UserState> {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_USERS_SUCCEDED:
      return {
        ...state,
        data: {
          ...state.data,
          users: action.payload,
        },
        isLoading: false,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
