import user from './data/user';

const API_ROOT = '/api/functions/';

export const STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  TEAPOT: 418,
  INVALID: 422,
};

/* eslint-disable quote-props */
export default {
  [`${API_ROOT}/ad`]: {
    POST() {
      return [STATUS.OK, {
        messase: 'YOU POSTED AN AD',
      }];
    },
    GET: [STATUS.OK, {
      messase: 'HERE\'S DETAILS ABOUT THE AD',
    }],
  },
};
/* eslint-enable quote-props */
