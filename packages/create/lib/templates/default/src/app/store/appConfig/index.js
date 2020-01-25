
// Types
const TYPES = {
  APP_CONFIG_SET: 'APP_CONFIG_SET',
};

// Selectors
// const selectors = {};

// Reducers
const initialState = {};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.APP_CONFIG_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Actions
const setAppConfig = appConfig => (dispatch) => {
  dispatch({ type: TYPES.APP_CONFIG_SET, payload: appConfig });
};

// actions are the default export
export default {
  setAppConfig,
};
