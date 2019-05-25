import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Unstated from 'unstated';
//

export { default as Container } from './Container';
export { default as Subscribe } from './Subscribe';

const isServer = typeof window === 'undefined';
const __FIRESTUDIO_STORE__ = '__FIRESTUDIO_STORE__';

const StoreDebugger = {
  isEnabled: false,
};

if (!isServer) {
  window.__FIRESTUDIO_STORE_DEBUGGER__ = StoreDebugger;
}


class Store extends PureComponent {
  static propTypes = {
    containers: PropTypes.shape({}),
    initialData: PropTypes.shape({}),
  }

  static defaultProps = {
    containers: {},
    initialData: {},
  }

  static getOrCreateStore = (containers, initialData) => {
    if (isServer) {
      return Store.initStore(containers, initialData);
    }

    if (!window[__FIRESTUDIO_STORE__]) {
      window[__FIRESTUDIO_STORE__] = Store.initStore(containers, initialData);
    }

    return window[__FIRESTUDIO_STORE__];
  }

  static initStore = (containers = {}, initialData = {}) => (
    Object.keys(containers).reduce((store, container) => {
      if (!initialData[container]) {
        // eslint-disable-next-line no-param-reassign
        store[container] = new containers[container]();
      }

      return store;
    }, Object.entries(initialData).reduce((initStore, [container, state]) => {
      // eslint-disable-next-line no-param-reassign
      initStore[container] = new containers[container](state);

      return initStore;
    }, {})
  ));

  componentDidMount() {
    const { debugStore } = this.props;
    if (debugStore) {
      StoreDebugger.isEnabled = true;
    }
  }

  render() {
    const { children, containers, initialData } = this.props;
    const injectedData = Object.values(Store.getOrCreateStore(containers, initialData));

    return (
      <Unstated.Provider inject={injectedData}>
        {children}
      </Unstated.Provider>
    );
  }
}

export default Store;
