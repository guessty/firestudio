import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Unstated from 'unstated';
//
export { default as Api } from './Api';
export { default as Container } from './Container';
export { default as Subscribe, RawSubscribe } from './Subscribe';

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
    stateContainers: PropTypes.shape({}),
    initialData: PropTypes.shape({}),
    firebaseInstance: PropTypes.shape({}),
  }

  static defaultProps = {
    stateContainers: {},
    initialData: {},
    firebaseInstance: undefined,
  }

  static getOrCreateStore = (stateContainers, initialData, firebaseInstance) => {
    if (isServer) {
      return Store.initStore(stateContainers, initialData, firebaseInstance);
    }

    if (!window[__FIRESTUDIO_STORE__]) {
      window[__FIRESTUDIO_STORE__] = Store.initStore(stateContainers, initialData, firebaseInstance);
    }

    return window[__FIRESTUDIO_STORE__];
  }

  static initStore = (stateContainers = {}, initialData = {}, firebaseInstance) => (
    Object.keys(stateContainers).reduce((store, container) => {
      if (!initialData[container]) {
        // eslint-disable-next-line no-param-reassign
        store[container] = new stateContainers[container]({}, firebaseInstance);
      }

      return store;
    }, Object.entries(initialData).reduce((initStore, [container, state]) => {
      // eslint-disable-next-line no-param-reassign
      initStore[container] = new stateContainers[container](state, firebaseInstance);

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
    const { children, stateContainers, initialData, firebaseInstance } = this.props;
    const injectedData = Object.values(Store.getOrCreateStore(stateContainers, initialData, firebaseInstance));

    return (
      <Unstated.Provider inject={injectedData}>
        {children}
      </Unstated.Provider>
    );
  }
}

export default Store;
