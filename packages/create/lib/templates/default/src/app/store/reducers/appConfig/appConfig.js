import { appConfig as TYPES } from '@store/types';

const initialState = {
  appConfig: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.APP_CONFIG_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
