import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'node-html-parser';
import parseUrl from 'url-parse';
import queryString from 'query-string';
import unfetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

import Routes from './../routes';

const buildRoutes = require('./../build/routes');

export default App => class _App extends Component {
  static isFirebaseAuthEnabled = Boolean(App.firebase && App.firebase.auth);

  static isAuthenticated() {
    let isFirebaseAuthenticated = true;
    if (_App.isFirebaseAuthEnabled) {
      const isClient = Boolean(process.browser) && typeof window !== 'undefined';
      const isFirebaseAuthLoaded = isClient ? _App.getNextDataFirepressProps().isFirebaseAuthLoaded : false;
      isFirebaseAuthenticated = isClient ? Boolean(isFirebaseAuthLoaded && App.firebase.auth().currentUser) : undefined;

      if (typeof isFirebaseAuthenticated === 'undefined') return undefined;
    } 

    let isCustomAuthenticated = true;
    if (typeof App.isAuthenticated === 'function') {
      isCustomAuthenticated = App.isAuthenticated();
    }

    return isFirebaseAuthenticated && isCustomAuthenticated;
  }

  static redirectPrivatePage(Router, redirect) {
    Router.replaceRoute(`${App.redirectPrivatePagesTo || '/'}?${queryString.stringify({ redirect })}`);
  }

  static AppLoader = () => (
    <h1 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading App...</h1>
  );

  static PageLoader = () => (
    <h1 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading Page...</h1>
  );

  static Soft404Page = () => (
    <div className="flex flex-col flex-grow justify-center items-center">
      <h1 style={{ padding: '60px 20px', textAlign: 'center' }}>404 | Page Not Found</h1>
    </div>
  );

  static updateRoutes(routes) {
    const { publicRuntimeConfig: { ROUTES } = {} } = getConfig() || {};

    const newRoutes = buildRoutes([
      ...ROUTES || [],
      ...routes || [],
    ]);

    Routes.routes = newRoutes.routes;
  }

  static setNextDataFirepressProps(props) {
    if (Boolean(process.browser) && typeof window !== 'undefined') {
      window.__NEXT_DATA__.props.firepressProps = {
        ...window.__NEXT_DATA__.props.firepressProps,
        ...props,
      };
    }
  }

  static getNextDataFirepressProps() {
    if (Boolean(process.browser) && typeof window !== 'undefined') {
      return window.__NEXT_DATA__.props.firepressProps || {};
    }

    return {};
  }

  static setCurrentRoute(Page, ctx) {    
    const { asPath, pathname: page } = ctx;
    const isClient = Boolean(process.browser) && typeof window !== 'undefined';
    const pageRedirectTo = Page.redirectTo === 'function' ? Page.redirectTo(ctx) : Page.redirectTo;

    const { pathname, query } = parseUrl(asPath, true);

    const filteredRoutes = Routes.routes.filter(route => route.page === page);
    const matchedRoute = filteredRoutes.find(route => route.match(pathname) !== undefined);

    const { pattern, redirectTo: routeRedirectTo } = matchedRoute || {};
    const params = matchedRoute ? matchedRoute.match(pathname) : {};

    const currentRoute = {
      asPath,
      pathname,
      pattern,
      redirectTo: pageRedirectTo || routeRedirectTo,
      query: {
        ...params,
        ...query,
      },
    };

    if (isClient) {
      Routes.Router.currentRoute = currentRoute;
    }

    return currentRoute;
  }

  static async getAppConfig(props) {
    const { ctx } = props;
    let appConfig;

    try {
      appConfig = await App.getAppConfig(ctx);
      if (!appConfig) appConfig = {};
    } catch {
      appConfig = {};
    }

    _App.updateRoutes(appConfig.routes || []);
    _App.setNextDataFirepressProps({ appConfig });

    return appConfig;
  }

  static async getExportedPageConfig(ctx) {
    const { asPath } = ctx;
    const response = await unfetch(asPath, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
      credentials: 'include',
    });
    const html = await response.text();
    const root = parse(html, { script: true })
    const dataNode = root.querySelector('#__NEXT_DATA__');
    const exportedProps = dataNode.rawText ? JSON.parse(dataNode.rawText).props : {};
    const exportedPageConfig = exportedProps.firepressProps.pageConfig || {};

    return exportedPageConfig;
  }

  static async getPageConfig(props) {
    const { ctx, Page } = props;

    const isClient = Boolean(process.browser) && typeof window !== 'undefined';

    let pageConfig = {};

    if (isClient && Page.exportPageConfig) {
      pageConfig = await _App.getExportedPageConfig(ctx);

      return pageConfig;
    }

    if (typeof Page.getPageConfig === 'function') {
      try {
        pageConfig = await Page.getPageConfig(ctx);
        if (!pageConfig) pageConfig = {};
      } catch (e) {
        console.warn('failed to getPageConfig', e);
        pageConfig = {};
      }
    }

    return pageConfig;
  }

  static async getInitialProps(appContext) {
    const { Component: Page, ctx: baseCtx } = appContext;

    const isServerlike = (!process.browser && Boolean(baseCtx.req && baseCtx.res));
    const isExporting = isServerlike && global && global.__NEXT_DATA__ && global.__NEXT_DATA__.nextExport;
    const isDevServer = isServerlike && process.env.NODE_ENV === 'development' && !isExporting;
    const isServer = isServerlike && !isDevServer && !isExporting;
    const isClient = Boolean(process.browser) && typeof window !== 'undefined';

    const {
      query, req, res, err, AppTree,
      pathname, asPath, isServer: ctxIsServer,
      ...extraCtx
    } = baseCtx;

    const newBaseCtx = {
      query,
      pathname,
      asPath,
      ...extraCtx,
    };

    const NEXT_DATA_FIREPRESS_PROPS = _App.getNextDataFirepressProps();
    const isFirebaseAuthEnabled = Boolean(App.firebase && App.firebase.auth);
    const isFirebaseAuthLoaded = NEXT_DATA_FIREPRESS_PROPS.isFirebaseAuthLoaded || false;

    let appConfig = NEXT_DATA_FIREPRESS_PROPS.appConfig;
    let pageConfig = (typeof appConfig === 'undefined'
      || typeof Page.getPageConfig === 'function' || Page.isPrivate)
      ? undefined : {};

    let currentRoute = _App.setCurrentRoute(Page, newBaseCtx);

    let firepressProps = {
      ctx: {
        ...newBaseCtx,
        ...currentRoute,
      },
      appConfig,
      pageConfig,
      isFirebaseAuthEnabled,
      ...isFirebaseAuthEnabled ? {
        isFirebaseAuthLoaded,
      } : {},
      Page: {
        Loader: Page.Loader,
        isPrivate: Page.isPrivate,
        getPageConfig: Page.getPageConfig,
        exportPageConfig: Page.exportPageConfig,
      },
    };

    if (typeof appConfig === 'undefined' && typeof App.getAppConfig === 'undefined') {
      appConfig = {};
      _App.setNextDataFirepressProps({ appConfig });
      pageConfig = (typeof Page.getPageConfig === 'function' || Page.isPrivate) ? undefined : {};
    }

    if (
      typeof appConfig === 'undefined'
      && typeof App.getAppConfig === 'function'
      && (
        (isDevServer && App.exportAppConfig)
        || (isExporting && App.exportAppConfig)
        || (isServer && !App.exportAppConfig)
        || (isClient)
      )
    ) {
      appConfig = await _App.getAppConfig(firepressProps);
      currentRoute = _App.setCurrentRoute(Page, newBaseCtx);
      if (isServer) {
        res.writeHead(302, { Location: currentRoute.asPath });
        res.end();
      } else if (isClient) {
        Routes.Router.replaceRoute(currentRoute.asPath);
      }
      firepressProps = {
        ...firepressProps,
        appConfig,
        ctx: {
          ...newBaseCtx,
          ...currentRoute,
        },
      };
    }

    if (currentRoute.redirectTo) {
      if (isServer) {
        res.writeHead(302, { Location: currentRoute.redirectTo });
        res.end();
      } else if (isClient) {
        Routes.Router.replaceRoute(currentRoute.redirectTo);
      }
    }

    if (typeof appConfig !== 'undefined') {
      if (Page.isPrivate && isFirebaseAuthEnabled && isFirebaseAuthLoaded) {
        if (!App.firebase.auth().currentUser) {
          _App.redirectPrivatePage(Routes.Router, asPath);
        } else {
          pageConfig = await _App.getPageConfig(firepressProps);
        }
      } else if (
        !Page.isPrivate
        && (
          (isDevServer && Page.exportPageConfig)
          || (isExporting && Page.exportPageConfig)
          || (isServer && !Page.exportPageConfig)
          || (isClient)
        )
      ) {
        pageConfig = await _App.getPageConfig(firepressProps);
      }
    }

    return {
      ...newBaseCtx,
      firepressProps: {
        ...firepressProps,
        pageConfig,
      },
    };
  }

  static getDerivedStateFromProps(props) {
    const { firepressProps } = props;
    const appConfig = firepressProps.appConfig;
    const pageConfig = firepressProps.pageConfig;
    const hasPageFullLoaded = typeof appConfig !== 'undefined' && !firepressProps.ctx.pathname.includes('*');

    return {
      ...firepressProps,
      appConfig,
      pageConfig,
      hasPageFullLoaded,
    };
  }

  state = {
    appConfig: undefined,
    pageConfig: undefined,
    wasLoadedFromCache: false,
    hasPageFullLoaded: undefined,
  };

  unregisterAuthObserver;

  async componentDidMount() {
    const {
      appConfig, pageConfig, hasPageFullLoaded,
      isFirebaseAuthEnabled,
    } = this.state;

    this.attachRouterEvents(Routes.Router);

    if (isFirebaseAuthEnabled) {
      _App.setNextDataFirepressProps({
        isFirebaseAuthEnabled: true,
        isFirebaseAuthLoaded: false,
      });
      this.unregisterAuthObserver = App.firebase.auth().onAuthStateChanged(() => {
        _App.setNextDataFirepressProps({ isFirebaseAuthLoaded: true });
        Routes.Router.pushRoute(Routes.Router.asPath);
      });
    }

    if (Routes.Router.currentRoute && Routes.Router.currentRoute.redirectTo) {
      Routes.Router.replaceRoute(Routes.Router.currentRoute.redirectTo);
    }

    if (!appConfig || (appConfig && !pageConfig) || !hasPageFullLoaded) {
      Routes.Router.pushRoute(Routes.Router.asPath);
    }
  }

  componentDidUpdate() {
    const {
      wasLoadedFromCache, appConfig, pageConfig, hasPageFullLoaded,
    } = this.state;

    if (Routes.Router.currentRoute && Routes.Router.currentRoute.redirectTo) {
      Routes.Router.replaceRoute(Routes.Router.currentRoute.redirectTo);
    }

    if (!appConfig || !pageConfig || !hasPageFullLoaded) {
      Routes.Router.pushRoute(Routes.Router.asPath);
    }

    if (wasLoadedFromCache) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ wasLoadedFromCache: false });
      document.getElementById('page').style.cssText = `
        visibility: visible;
      `;
    }
  }

  componentWillUnmount() {
    const { isFirebaseAuthEnabled } = this.state;

    if (isFirebaseAuthEnabled) {
      this.unregisterAuthObserver();
    }
  }

  attachRouterEvents(Router) {
    Router.beforePopState(() => {
      setTimeout(() => {
        this.setState({ wasLoadedFromCache: true });
      }, 0);
      document.getElementById('page').style.cssText = `
        visibility: hidden;
      `;

      return true;
    });

    const updateQueryState = (queryParams) => {
      const currentState = window.history.state;
      const parsedUrl = parseUrl(Router.currentRoute.asPath, true);

      const updatedQuery = {
        ...parsedUrl.query,
        ...queryParams,
      };

      parsedUrl.set('query', updatedQuery);
      Router.currentRoute.asPath = parsedUrl.href;
      Router.currentRoute.query = {
        ...Router.currentRoute.query,
        ...updatedQuery
      };

      const updatedState = {
        ...currentState,
        ...currentState.as ? { as: parsedUrl.href } : {},
        query: updatedQuery,
      };
      const updatedQueryParams = `?${queryString.stringify(updatedQuery)}`;

      return {
        updatedState,
        updatedQueryParams,
      };
    };

    if (typeof Router.pushQueryParams !== 'function') {
      Router.pushQueryParams = (queryParams) => {
        const { updatedState, updatedQueryParams } = updateQueryState(queryParams);
        window.history.pushState(updatedState, 'updateQueryParams', updatedQueryParams);
        const event = new CustomEvent('onupdatequeryparams', { detail: updatedState.query });
        window.dispatchEvent(event);
      };
    }

    if (typeof Router.replaceQueryParams !== 'function') {
      Router.replaceQueryParams = (queryParams) => {
        const { updatedState, updatedQueryParams } = updateQueryState(queryParams);
        window.history.replaceState(updatedState, 'updateQueryParams', updatedQueryParams);
        const event = new CustomEvent('onupdatequeryparams', { detail: updatedState.query });
        window.dispatchEvent(event);
      };
    }
  }

  render() {
    const {
      Component: PageComponent,
      firepressProps: { Page },
      firepressProps,
      router,
      ...props
    } = this.props;
    const {
      wasLoadedFromCache,
      appConfig, pageConfig,
      ctx, ctx: { pathname, query, asPath },
      hasPageFullLoaded,
    } = this.state;

    const canRenderApp = (typeof appConfig !== 'undefined');
    const AppLoader = App.AppLoader || _App.AppLoader;
    if (!canRenderApp) return (<AppLoader />);

    const filteredRoutes = Routes.routes.filter(route => !route.pattern.match(/:(?<=:)(.*)(?=\*)/g))
    const pageMatches = filteredRoutes.filter(route => route.regex.test(pathname));
    const doesPageExist = Boolean(pageMatches.length);

    const Soft404Page = App.Soft404Page || _App.Soft404Page;

    const Loader = Page.Loader || App.PageLoader || _App.PageLoader;

    const pageProps = {
      pageConfig,
      wasLoadedFromCache,
      Loader,
    };

    const canReturnPage = typeof pageConfig !== 'undefined' && hasPageFullLoaded;

    const appProps = {
      ...props,
      pathname,
      query,
      asPath,
      appConfig,
      Page: ({ children, ...extraProps }) => (
        <div
          id="page"
          className="flex flex-col flex-grow w-full"
        >
          {canReturnPage ? (
            doesPageExist ? (
              <PageComponent {...pageProps} {...extraProps} {...ctx}>
                {children}
              </PageComponent>
            ) : (
              <Soft404Page />
            )
          ) : (
            <Loader />
          )}
        </div>
      ),
    }

    return (
      <App {...appProps} />
    );
  }
}
