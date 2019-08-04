import React from 'react';
import * as Unstated from 'unstated';
import { detailedDiff } from 'deep-object-diff';
//
import * as Containers from './containers';

const isServer = typeof window === 'undefined';
const __NEXT_TOOLS_STORE__ = '__NEXT_TOOLS_STORE__';

const __NEXT_TOOLS_STORE_DEBUGGER__ = {
  isEnabled: false,
};

if (!isServer) {
  window.__NEXT_TOOLS_STORE_DEBUGGER__ = __NEXT_TOOLS_STORE_DEBUGGER__;
}

const StoreDebugger = __NEXT_TOOLS_STORE_DEBUGGER__;


class Store extends React.PureComponent {
  static getOrCreateStore = () => {
    if (isServer) {
      return Store.initStore();
    }

    if (!window[__NEXT_TOOLS_STORE__]) {
      window[__NEXT_TOOLS_STORE__] = Store.initStore();
    }

    return window[__NEXT_TOOLS_STORE__];
  }

  // static initStore = () => Object.keys(Containers || {}).reduce((initContainers, container) => [
  //   ...initContainers,
  //   new Containers[container](),
  // ], []);

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
    const { children } = this.props;

    return (
      <Unstated.Provider inject={Object.values(Store.getOrCreateStore())}>
        {children}
      </Unstated.Provider>
    );
  }
}

class Container extends Unstated.Container {
  state = {}

  setState = async (updater, callback) => {
    const { name } = this.constructor;
    const prevState = { ...this.state };
    await super.setState(updater, callback);
    const newState = { ...this.state };

    if (__NEXT_TOOLS_STORE_DEBUGGER__.isEnabled) {
      const diff = detailedDiff(prevState, newState);

      console.groupCollapsed(name);
      const hasChanges = obj => !!Object.keys(obj).length;

      if (hasChanges(diff.added)) {
        console.log('Added\n', diff.added);
      }

      if (hasChanges(diff.updated)) {
        console.log('Updated\n', diff.updated);
      }

      if (hasChanges(diff.deleted)) {
        console.log('Deleted\n', diff.deleted);
      }

      console.log('New state\n', newState);
      console.log('Old state\n', prevState);
      console.groupEnd();
    }
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
  Container,
  subscribe,
};

export default Store;
