export default {
  SESSION: {
    KEY: '__session',
    CSRF: 'CSRF-TOKEN',
    AUTH: 'AUTH-TOKEN',
    OPTIONS: {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000, // one week,
    },
  },
  CSRF: {
    KEY: 'XSRF-TOKEN',
    OPTIONS: {
      maxAge: 7 * 24 * 3600 * 1000, // one week,
      path: '/',
    },
  },
  STATUS: {
    KEY: 'isAuthenticated',
    OPTIONS: {
      maxAge: 7 * 24 * 3600 * 1000, // one week,
    },
  },
};
