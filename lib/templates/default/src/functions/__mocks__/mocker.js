import MockAdapter from 'axios-mock-adapter';
import responses, { STATUS } from './responses';

export default function (axiosInstance, delayResponse = 0) {
  const mock = new MockAdapter(axiosInstance, { delayResponse });

  /* eslint-disable no-console */
  const end = (...response) => response;

  mock.onAny().reply(({ url, ...config }) => {
    const route = responses[url];
    const method = config.method.toUpperCase();

    if (route && route[method]) {
      let payload = null;

      if (typeof config.data !== 'undefined') {
        payload = JSON.parse(config.data);
      }

      try {
        if (typeof route[method] === 'function') {
          if (Object.values(payload).some(val => /(invalid|error|fail)/.test(val))) {
            return end(STATUS.INVALID, 'These details do not appear to be valid');
          }

          const response = route[method](payload);

          return end(...response);
        }

        return end(...route[method]);
      } catch (e) {
        console.error(e);

        return end(STATUS.BAD_REQUEST);
      }
    }

    console.log('Could not find a mock!');

    // Unexpected request, error out
    return end(STATUS.TEAPOT, {});
  });
  /* eslint-enable no-console */

  return axiosInstance;
}
