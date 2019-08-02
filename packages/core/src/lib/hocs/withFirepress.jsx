import * as React from 'react';
import { parse } from 'node-html-parser';
import unfetch from 'isomorphic-unfetch';
//
import Store from '../components/Store';
const buildRoutes = require('./../build/routes')
//

export default (App) => class _App extends React.Component {
  static PageLoader = () => (
    <h2 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading...</h2>
  )

  static Routes = buildRoutes(process.env.ROUTES || [])

  static async getInitialProps(appContext) {
    const appProps = (typeof App.getInitialProps === 'function') ?
      await App.getInitialProps(appContext) : {}

    const { Component, ctx } = appContext;

    let pageData;
    const isExport = (!process.browser && !(ctx && ctx.req && ctx.req.headers));
    const isClient = (Boolean(process.browser) && !(ctx && ctx.req && ctx.req.headers));
    const isServer = (!process.browser && Boolean(ctx && ctx.req && ctx.req.headers));
    const isPrivate = Component.isPrivate && (isServer || (App.firebase && App.firebase.auth));
    const isAuthenticated = isClient && App.firebase && App.firebase.auth && App.firebase.auth().currentUser;

    if (isClient && !Component.isDynamic && (!isPrivate || (isPrivate && isAuthenticated))) {
      const response = await unfetch(ctx.asPath, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
        credentials: 'include',
      });
      const html = await response.text();
      const root = parse(html, { script: true })
      const dataNode = root.querySelector('#__NEXT_DATA__');
      return dataNode.rawText ? JSON.parse(dataNode.rawText).props : {};
    }

    if (typeof Component.getPageData === 'function' && 
      (!isPrivate || (isPrivate && isAuthenticated)) && (
      (isExport && !Component.isDynamic) ||
      (isServer) || (isClient)
    )) {
      pageData = await Component.getPageData(ctx.query);

      if (!pageData) {
        pageData = null;
      }
    }

    const componentNeedsPageData = typeof pageData === 'undefined'
      && typeof Component.getPageData === 'function'
      && Component.isDynamic;

    const firepressProps = {
      isDynamic: Component.isDynamic || false,
      isPrivate,
      pageData,
      componentNeedsPageData,
      PageLoader: Component.PageLoader || null,
      query: ctx.query,
    };

    return {
      ...appProps,
      firepressProps,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const router = typeof window !== 'undefined' ? _App.Routes.Router : {
      router: props.router,
    };

    return {
      router,
      previousPath: state.currentPath,
      currentPath: router.router.asPath,
    };
  }

  state = {
    router: undefined,
    previousPath: undefined,
    currentPath: undefined,
    wasLoadedFromCache: false,
    isAuthenticated: undefined,
  }

  unregisterAuthObserver

  async componentDidMount() {
    const { firepressProps: { isPrivate, componentNeedsPageData } } = this.props;
    const { router } = this.state;

    if (App.firebase && App.firebase.auth) {
      this.unregisterAuthObserver = App.firebase.auth().onAuthStateChanged((user) => {
        this.setState({ isAuthenticated: !!user });
      });
    }
    
    if (!isPrivate && componentNeedsPageData) {
      await _App.Routes.Router.pushRoute(router.router.asPath)
    }

    router.beforePopState(() => {
      setTimeout(() => {
        this.setState({
          wasLoadedFromCache: true,
        })
      }, 0)
      document.getElementById('page').style.cssText = `
        visibility: hidden;
      `;
      return true
    });
  }

  componentDidUpdate() {
    const { wasLoadedFromCache, isAuthenticated, router } = this.state;
    const { firepressProps: { isPrivate, componentNeedsPageData } } = this.props;

    if (isPrivate) {
      if (!isAuthenticated) {
        _App.Routes.Router.replaceRoute(App.redirectPrivatePagesTo || '/sign-in');
      } else if (isAuthenticated && componentNeedsPageData) {
        _App.Routes.Router.pushRoute(router.router.asPath);
      }
    }

    if (wasLoadedFromCache) {
      this.setState({
        wasLoadedFromCache: false,
      })
      document.getElementById('page').style.cssText = `
        visibility: visible;
      `;
    }
  }

  componentWillUnmount() {
    if (App.firebase.auth) {
      this.unregisterAuthObserver();
    }
  }

  render() {
    const { Component, pageProps: componentProps, firepressProps, ...props } = this.props;
    const { router, wasLoadedFromCache, isAuthenticated } = this.state;
    const PageLoader = firepressProps.PageLoader || App.PageLoader || _App.PageLoader;
    const pageProps = {
      ...pageProps,
      ...firepressProps,
      isLoadingPage: firepressProps.componentNeedsPageData,
      PageLoader,
    }
    const canReturnPage = !firepressProps.isPrivate || (firepressProps.isPrivate && isAuthenticated);
    const appProps = {
      ...props,
      router,
      Component,
      Page: ({ children, ...extraProps }) => (
        <div
          id="page"
          className="flex flex-col flex-grow w-full"
        >
          {canReturnPage ? (
            <Component {...pageProps} {...extraProps} wasLoadedFromCache={wasLoadedFromCache}>
              {children}
            </Component>
          ) : (
            <PageLoader />
          )}
        </div>
      ),
      pageProps,
    }

    const storeConfig = App.storeConfig || {};

    return (
      <Store {...storeConfig} firebaseInstance={App.firebase}>
        <App {...appProps} />
      </Store>
    );
  }
};
