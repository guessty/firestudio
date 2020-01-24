
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as reducers from './reducers/index';

export const initStore = (initialState = {}) => {
  const combinedReducers = combineReducers(reducers || {});
  const composeEnhancers = () => composeWithDevTools();

  return createStore(combinedReducers, initialState, composeEnhancers(applyMiddleware(thunk)));
};
