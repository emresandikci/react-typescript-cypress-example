import axios from 'axios';
import { AppDispatch } from 'store';
import { userTypes } from 'store/actionTypes';
import { HTTP_STATUS } from 'utils/enums';
import { IUser } from 'utils/types/user';

const { GET_USERS, GET_USERS_SUCCEDED, GET_USERS_FAILED } = userTypes;

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUsers = () => async (dispatch: AppDispatch<IUser>) => {
  try {
    dispatch({
      type: GET_USERS,
    });
    const { status, data } = await axios.get<IUser[]>(`${BASE_API_URL}/users`);
    if (status === HTTP_STATUS.OK) {
      dispatch({
        type: GET_USERS_SUCCEDED,
        payload: data,
      });
      return Promise.resolve(data);
    } else {
      dispatch({
        type: GET_USERS_FAILED,
        payload: data,
      });
      return Promise.reject(data);
    }
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILED,
      payload: error,
    });
  }
};
