
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

// import you reducers here
import { reducers as appConfig } from '@store/appConfig';

const reducers = {
  hydrate: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  appConfig,
};

const initStore = (initialState = {}) => {
  const combinedReducers = combineReducers(reducers || {});
  const composeEnhancers = () => composeWithDevTools();

  return createStore(combinedReducers, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export const wrapper = createWrapper(initStore);
