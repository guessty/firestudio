import axios from 'axios';
import cookies from 'browser-cookies';
import { Container } from '@store';
//
import * as routes from './routes';

class Api extends Container {
  static send = async (config) => {
    const response = await axios(config);

    return response;
  }

  static ROUTES = routes

  state = {}

  update = (key, updates) => {
    this.setState((state) => {
      // eslint-disable-next-line no-param-reassign
      state[key] = {
        ...state[key],
        ...updates,
      };
    });
  }

  request = async (config, key, take) => {
    const requestKey = key || config.url;
    const currentApiRequest = this.state[requestKey] || {};
    const csrfToken = cookies.get('XSRF-TOKEN');
    const count = currentApiRequest + 1 || 1;

    try {
      let axiosConfig = {
        ...config,
        xsrfHeaderName: 'X-XSRF-Token',
        headers: {
          ...csrfToken ? { 'X-XSRF-Token': csrfToken } : {},
        },
      };
      let call = null;

      if (take === 'first' && currentApiRequest.status === 'pending') {
        throw new Error('Please wait - request still pending...');
      }

      if (take === 'last') {
        if (currentApiRequest.call) {
          currentApiRequest.call.cancel();
        }
        call = axios.CancelToken.source();
        axiosConfig = {
          ...axiosConfig,
          cancelToken: call.token,
        };
      }
      await this.update(requestKey, { status: 'pending', count, call });
      const response = await Api.send(axiosConfig);
      await this.update(requestKey, { status: null, count: null, call: null });

      return response;
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        /* tslint:disable-next-line */
        console.log('Request canceled', thrown.message);
      } else {
        await this.update(requestKey, { status: null, count: null, call: null });
        /* tslint:disable-next-line */
        console.log(thrown);
      }

      return thrown;
    }
  }
}

export default Api;
