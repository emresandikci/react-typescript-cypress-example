import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from 'store/reducers';
import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import { InitialState } from 'utils/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch<T> = ThunkDispatch<InitialState<Array<T>>, void, AnyAction>;

export default store;
