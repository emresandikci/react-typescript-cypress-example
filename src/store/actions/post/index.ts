import axios from 'axios';
import { AppDispatch } from 'store';
import { postTypes } from 'store/actionTypes';
import { HTTP_STATUS } from 'utils/enums';
import { IPost } from 'utils/types/post';

const { GET_POSTS, GET_POSTS_SUCCEDED, GET_POSTS_FAILED } = postTypes;

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

export const getPosts = () => async (dispatch: AppDispatch<IPost>) => {
  try {
    dispatch({
      type: GET_POSTS,
    });
    const { status, data } = await axios.get<IPost[]>(`${BASE_API_URL}/posts`);
    if (status === HTTP_STATUS.OK) {
      dispatch({
        type: GET_POSTS_SUCCEDED,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_POSTS_FAILED,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAILED,
      payload: error,
    });
  }
};
