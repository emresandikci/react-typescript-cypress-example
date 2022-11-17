import axios from 'axios';
import { AppDispatch } from 'store';
import { commentTypes } from 'store/actionTypes';
import { HTTP_STATUS } from 'utils/enums';
import { IComment } from 'utils/types/comment';

const { GET_COMMENTS, GET_COMMENTS_SUCCEDED, GET_COMMENTS_FAILED } = commentTypes;

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getComments = () => async (dispatch: AppDispatch<IComment>) => {
  try {
    dispatch({
      type: GET_COMMENTS,
    });
    const { status, data } = await axios.get<IComment[]>(`${BASE_API_URL}/comments`);
    if (status === HTTP_STATUS.OK) {
      dispatch({
        type: GET_COMMENTS_SUCCEDED,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_COMMENTS_FAILED,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAILED,
      payload: error,
    });
  }
};
