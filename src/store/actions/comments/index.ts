import axios from 'axios';
import store, { AppDispatch, RootState } from 'store';
import { commentTypes } from 'store/actionTypes';
import { HTTP_STATUS } from 'utils/enums';
import { IdentityKey } from 'utils/types';
import { CommentPayload, IComment } from 'utils/types/comment';

const {
  GET_COMMENTS,
  GET_COMMENTS_SUCCEDED,
  GET_COMMENTS_FAILED,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_SUCCEDED,
  GET_COMMENTS_BY_POST_ID_FAILED,
  ADD_COMMENT,
  ADD_COMMENT_SUCCEDED,
  ADD_COMMENT_FAILED,
} = commentTypes;

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
      return Promise.resolve(data);
    } else {
      dispatch({
        type: GET_COMMENTS_FAILED,
        payload: data,
      });
      return Promise.reject(data);
    }
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAILED,
      payload: error,
    });
  }
};

export const getCommentsByPost =
  (postId: IdentityKey) => async (dispatch: AppDispatch<IComment>) => {
    try {
      dispatch({
        type: GET_COMMENTS_BY_POST_ID,
      });
      const { status, data } = await axios.get<IComment[]>(
        `${BASE_API_URL}/post/${postId}/comments`
      );
      if (status === HTTP_STATUS.OK) {
        dispatch({
          type: GET_COMMENTS_BY_POST_ID_SUCCEDED,
          payload: data,
        });
        return Promise.resolve(data);
      } else {
        dispatch({
          type: GET_COMMENTS_BY_POST_ID_FAILED,
          payload: data,
        });
        return Promise.reject(data);
      }
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_BY_POST_ID_FAILED,
        payload: error,
      });
    }
  };

export const addComment =
  (newComment: CommentPayload) =>
  async (dispatch: AppDispatch<IComment>): Promise<IComment | undefined> => {
    try {
      dispatch({
        type: ADD_COMMENT,
      });
      const { status, data } = await axios.post<IComment>(`${BASE_API_URL}/comments`, newComment);
      if (status === HTTP_STATUS.CREATED) {
        store.getState().comments.data?.comments?.push({ ...data, tags: ['test', 'test1'] });
        dispatch({
          type: ADD_COMMENT_SUCCEDED,
          payload: data,
        });
        return Promise.resolve(data);
      } else {
        dispatch({
          type: ADD_COMMENT_FAILED,
          payload: data,
        });
        return Promise.reject(data);
      }
    } catch (error) {
      dispatch({
        type: ADD_COMMENT_FAILED,
        payload: error,
      });
    }
  };
