import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Unstated from 'unstated';
//
import * as Containers from './containers';

const isServer = typeof window === 'undefined';
const __FIRESTUDIO_STORE__ = '__FIRESTUDIO_STORE__';

const __FIRESTUDIO_STORE_DEBUGGER__ = {
  isEnabled: false,
};

if (!isServer) {
  window.__FIRESTUDIO_STORE_DEBUGGER__ = __FIRESTUDIO_STORE_DEBUGGER__;
}

const StoreDebugger = __FIRESTUDIO_STORE_DEBUGGER__;


class Store extends PureComponent {
  static propTypes = {
    initialData: PropTypes.shape({}),
  }

  static defaultProps = {
    initialData: {},
  }

  static getOrCreateStore = (initialData) => {
    if (isServer) {
      return Store.initStore(initialData);
    }

    if (!window[__FIRESTUDIO_STORE__]) {
      window[__FIRESTUDIO_STORE__] = Store.initStore(initialData);
    }

    return window[__FIRESTUDIO_STORE__];
  }

  static initStore = (initialData = {}) => Object.keys(Containers).reduce((store, container) => {
    if (!initialData[container]) {
      // eslint-disable-next-line no-param-reassign
      store[container] = new Containers[container]();
    }

    return store;
  }, Object.entries(initialData).reduce((initStore, [container, state]) => {
    // eslint-disable-next-line no-param-reassign
    initStore[container] = new Containers[container](state);

    return initStore;
  }, {}));

  componentDidMount() {
    const { debugStore } = this.props;
    if (debugStore) {
      StoreDebugger.isEnabled = true;
    }
  }

  render() {
    const { children, initialData } = this.props;
    const injectedData = Object.values(Store.getOrCreateStore(initialData));

    return (
      <Unstated.Provider inject={injectedData}>
        {children}
      </Unstated.Provider>
    );
  }
}

const subscribe = to => Component => (props) => {
  const containers = Object.keys(to).map(key => to[key]);

  return (
    <Unstated.Subscribe to={[...containers]}>
      {(...values) => {
        const mappedContainers = Object.keys(to).reduce((acc, key, i) => {
          acc[key] = values[i];

          return acc;
        }, {});

        return <Component {...props} {...mappedContainers} />;
      }}
    </Unstated.Subscribe>
  );
};


export {
  subscribe,
};

export default Store;
