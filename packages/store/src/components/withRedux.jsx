import React, { Component } from 'react';

const defaultConfig = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: state => state,
  deserializeState: state => state,
};

export default (makeStore, config = {}) => {
  config = {
    ...defaultConfig,
    ...config,
  };

  const isServer = typeof window === 'undefined';

  const initStore = ({ initialState, ctx }) => {
    const { storeKey } = config;

    const createStore = () =>
      makeStore(config.deserializeState(initialState), {
        ...ctx,
        ...config,
        isServer,
      });

    if (isServer) return createStore();

    // Memoize store if client
    if (!(storeKey in window)) {
      window[storeKey] = createStore();
    }

    return window[storeKey];
  };

  return App => class WrappedApp extends Component {
    /* istanbul ignore next */
    static displayName = `withRedux(${App.displayName || App.name || 'App'})`;
    
    static getInitialProps = async (appCtx) => {
        /* istanbul ignore next */
        if (!appCtx) throw new Error('No app context');
        /* istanbul ignore next */
        if (!appCtx.ctx) throw new Error('No page context');

        const store = initStore({
          ctx: appCtx.ctx,
        });

        if (config.debug)
          console.log('1. WrappedApp.getInitialProps wrapper got the store with state', store.getState());

        appCtx.ctx.store = store;
        appCtx.ctx.isServer = isServer;

        let initialProps = {};

        if ('getInitialProps' in App) {
          initialProps = await App.getInitialProps.call(App, appCtx);
        }

        if (config.debug) console.log('3. WrappedApp.getInitialProps has store state', store.getState());

        return {
          isServer,
          initialState: isServer ? config.serializeState(store.getState()) : store.getState(),
          ...initialProps,
        };
      };

      constructor(props, context) {
        super(props, context);
        const { initialState } = props;

        if (config.debug) console.log('4. WrappedApp.render created new store with initialState', initialState);

        this.store = initStore({
          initialState,
        });
      }

      store;

      render() {
        const { initialState, ...props } = this.props;

        // Cmp render must return something like <Provider><Component/></Provider>
        return <App {...props} store={this.store} />;
      }
  };
};
