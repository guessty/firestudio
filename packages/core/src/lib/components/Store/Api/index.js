import cookies from 'browser-cookies';
import unfetch from 'isomorphic-unfetch';
import Container from '../Container';
//

class Api extends Container {
  static fetch = async (url, initConfig) => {
    const { method, data, body, headers, ...remainingConfig } = initConfig;
    const csrfToken = cookies.get('XSRF-TOKEN');
    const init = {
      ...remainingConfig,
      method: method ? method.toUpperCase() : 'GET',
      ...(body || data) ? { body: body || data } : {},
      headers: {
        ...headers,
        ...csrfToken ? { 'X-XSRF-Token': csrfToken } : {},
      },
      credentials: 'same-origin',
    }
    const response = await unfetch(url, init);
    
    return response;
  }

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

  fetch = async (url, initConfig, take) => {
    const currentApiRequest = this.state[url] || {};
    const count = currentApiRequest + 1 || 1;
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      if (take === 'first' && currentApiRequest.status === 'pending') {
        throw new Error('Please wait - request still pending...');
      }

      if (take === 'last') {
        if (currentApiRequest.controller) {
          currentApiRequest.controller.abort();
        }
      }
      await this.update(url, { status: 'pending', count, controller });
      const response = await Api.fetch(url, { ...initConfig, signal })
      await this.update(url, { status: null, count: null, controller: null });

      return response;
    } catch (thrown) {
      if (thrown.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Uh oh, an error!', thrown);
        await this.update(requestKey, { status: null, count: null, controller: null });
      }
    }
  }
}
