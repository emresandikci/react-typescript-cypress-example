import axios from 'axios';
import store from 'store';

const headers = {
  'Content-Type': 'application/json',
};

//Request
axios.interceptors.request.use(
  function (config) {
    store.dispatch({ type: 'GLOBAL_LOADING' });
    config.headers = headers;
    return config;
  },
  function (error) {
    store.dispatch({ type: 'GLOBAL_LOADING_END' });

    return Promise.reject(error);
  }
);

//Response
axios.interceptors.response.use(
  function (response) {
    store.dispatch({ type: 'GLOBAL_LOADING_END' });
    return response;
  },
  function (error) {
    store.dispatch({ type: 'GLOBAL_LOADING_END' });

    const response = error.response?.data?.errorMessages || [];

    return Promise.reject(response);
  }
);
