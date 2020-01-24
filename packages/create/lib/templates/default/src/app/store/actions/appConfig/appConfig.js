import { appConfig as TYPES } from '@store/types';

const setAppConfig = appConfig => (dispatch) => {
  dispatch({ type: TYPES.APP_CONFIG_SET, payload: appConfig });
};

export default {
  setAppConfig,
};
