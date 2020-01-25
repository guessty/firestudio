
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

// import you reducers here
import { reducers as appConfig } from '@store/appConfig';

const reducers = {
  appConfig,
};

export const initStore = (initialState = {}) => {
  const combinedReducers = combineReducers(reducers || {});
  const composeEnhancers = () => composeWithDevTools();

  return createStore(combinedReducers, initialState, composeEnhancers(applyMiddleware(thunk)));
};
