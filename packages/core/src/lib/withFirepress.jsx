import React from 'react';
import parseUrl from 'url-parse';
import queryString from 'query-string';

import Routes, { initRoutes } from './routes';

export default App => class _App extends React.Component {
  static isFirebaseAuthEnabled = Boolean(App.firebase && App.firebase.auth);

  static defaultClientFallbackPage = App.defaultClientFallbackPage || '/_error';

  static PageLoader = () => (
    <h1 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading Page...</h1>
  );

  static getDerivedStateFromProps(props) {
    return {
      isPageLoading: props.pageProps && props.pageProps.isPageLoading,
    };
  }

  state = {
    isAuthenticated: undefined,
    isAppLoading: this.isAppInitLoading(),
    isPageLoading: false,
  };

  async componentDidMount() {
    const { Component } = this.props;
    const { isAppLoading } = this.state;

    let ROUTES = typeof App.ROUTES === 'function' ? await App.ROUTES() : App.ROUTES;
    if (typeof ROUTES !== 'undefined' && !Array.isArray(ROUTES)) {
      // eslint-disable-next-line no-console
      console.log('App.ROUTES must return an array of routes.');
    }
    ROUTES = Array.isArray(ROUTES) ? ROUTES : [];

    Routes.Router.router.events.on('routeChangeComplete', this.handleRouteChangeComplete);

    initRoutes(ROUTES);
    if (isAppLoading) {
      setTimeout(() => {
        this.checkCurrentRoute();
      }, 0);
    }

    if (_App.isFirebaseAuthEnabled) {
      this.unregisterAuthObserver = App.firebase.auth().onAuthStateChanged(async (user) => {
        this.setState({ isAuthenticated: Boolean(user) });
        if (!user && Component.isPrivate) {
          const as = `${App.redirectPrivatePagesTo || '/'}?${queryString.stringify({ redirect: Routes.Router.asPath })}`;
          Routes.Router.replaceRoute(as);
        } 
      });
    }
  }

  async componentDidUpdate() {
    const { Component } = this.props;
    const { isAuthenticated } = this.state;

    if (_App.isFirebaseAuthEnabled && Component.isPrivate && isAuthenticated === false) {
      const as = `${App.redirectPrivatePagesTo || '/'}?${queryString.stringify({ redirect: Routes.Router.asPath })}`;
      Routes.Router.replaceRoute(as);
    }
  }

  componentWillUnmount() {
    Routes.Router.router.events.off('routeChangeComplete', this.handleRoutesSet);
    if (_App.isFirebaseAuthEnabled) {
      this.unregisterAuthObserver();
    }
  }

  handleRouteChangeComplete = () => {
    const { router } = this.props;
    const { isAppLoading } = this.state;

    if (isAppLoading) {
      const fallbackPage = _App.defaultClientFallbackPage;
      if (router.route !== fallbackPage) {
        this.setState({ isAppLoading: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  };

  isAppInitLoading() {
    const { Component, router } = this.props;

    return App.isClientFallbackEnabled
      && (
        (router.route === _App.defaultClientFallbackPage)
        || (router.route.includes('[...') && Component.getStaticPropsForClient)
        || (Component.useClientFallback)
        || (Component.redirectTo)
        || (Component.isPrivate)
      );
  }

  checkCurrentRoute() {
    const { router } = this.props;
    const url = router.asPath.replace('index.html', '').replace('.html', '');
    const { pathname, query } = parseUrl(url, true);

    const Route = Routes.isValidClientRoute(pathname);

    if (Route) {
      const as = queryString.stringifyUrl({ url: pathname, query });
      if (Route.redirectTo) {
        const params = Route.match(pathname);
        Routes.Router.replaceRoute(Route.toRedirectPath(params));
      } else {
        Routes.Router.replaceRoute(as);
      }
    } else {
      this.setState({ isAppLoading: false });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const {
      isAuthenticated, isAppLoading, isPageLoading,
    } = this.state;
    const PageLoader = Component.PageLoader || App.PageLoader || _App.PageLoader;

    const isLoading = isAppLoading || isPageLoading
      || (_App.isFirebaseAuthEnabled && Component.isPrivate && !isAuthenticated);

    return (
      <App
        {...this.props}
        pageProps={pageProps}
        Component={isLoading ? PageLoader : Component}
      />
    );
  }
};
