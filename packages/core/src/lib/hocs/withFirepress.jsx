import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'node-html-parser';
import parseUrl from 'url-parse';
import queryString from 'query-string';
import unfetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

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

  static getServerCtx(ctx) {
    const isServer = (!process.browser && Boolean(ctx.req && ctx.res));
    const isDevServer = process.env.NODE_ENV === 'development' && isServer;
    const isExporting = isServer && global && global.__NEXT_DATA__ && global.__NEXT_DATA__.nextExport;

    return {
      isExporting,
      isServer,
      isDevServer,
    };
  }

  static getRoutes(routes) {
    const { publicRuntimeConfig: { ROUTES } = {} } = getConfig() || {};
    return buildRoutes([
      ...ROUTES || [],
      ...routes || [],
    ]);
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

  static getCtx(ctx, Routes) {
    const { asPath, pathname: page } = ctx;

    if (!page.includes('*')) return ctx;
    
    const { pathname, query } = parseUrl(asPath, true);
    const params = Routes.routes
      .filter(route => route.page === page)
      .map(route => route.match(pathname))
      .find(route => route !== undefined) || {};

    return {
      ...ctx,
      pathname,
      query: {
        ...params,
        ...query,
      }
    };
  }

  static async getAppConfig(props) {
    const { ctx, Page, Routes } = props;
    let appConfig;

    if (Page.redirectTo) {
      Routes.Router.replaceRoute(Page.redirectTo);
    }

    try {
      appConfig = await App.getAppConfig(ctx);
      if (!appConfig) appConfig = {};
    } catch {
      appConfig = {};
    }

    _App.setNextDataFirepressProps({ appConfig })

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
    const { ctx, Page, Routes } = props;

    const isClient = Boolean(process.browser) && typeof window !== 'undefined';

    let pageConfig = {};

    if (Page.redirectTo) {
      Routes.Router.replaceRoute(Page.redirectTo);
    }

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
    const serverCtx = _App.getServerCtx(baseCtx);
    const isClient = Boolean(process.browser) && typeof window !== 'undefined';

    const {
      query, req, res, err, AppTree,
      pathname, asPath, isServer,
      ...extraCtx
    } = baseCtx;

    const newBaseCtx = {
      query,
      pathname,
      asPath,
      ...extraCtx,
    };

    const NEXT_DATA_FIREPRESS_PROPS = _App.getNextDataFirepressProps();
    let appConfig = NEXT_DATA_FIREPRESS_PROPS.appConfig;
    let pageConfig = (typeof Page.getPageConfig === 'function' || Page.isPrivate) ? undefined : {};
    let Routes = _App.getRoutes(appConfig && appConfig.routes ? appConfig.routes : []);

    const redirectPath = typeof Page.redirectTo === 'function' ? Page.redirectTo(newBaseCtx) : Page.redirectTo;

    if (redirectPath && serverCtx.isServer && !serverCtx.isDevServer && !serverCtx.isExporting) {
      const { res } = baseCtx;
      res.writeHead(302, { Location: redirectPath });
      res.end();
    } else if (isClient && redirectPath) {
      Routes.Router.replaceRoute(redirectPath);
    }

    let ctx = _App.getCtx(newBaseCtx, Routes);
    const isFirebaseAuthEnabled = Boolean(App.firebase && App.firebase.auth);
    const isFirebaseAuthLoaded = NEXT_DATA_FIREPRESS_PROPS.isFirebaseAuthLoaded || false;

    let firepressProps = {
      ctx,
      Routes,
      appConfig,
      pageConfig,
      isFirebaseAuthEnabled,
      ...isFirebaseAuthEnabled ? {
        isFirebaseAuthLoaded,
      } : {},
      Page: {
        Loader: Page.Loader,
        isPrivate: Page.isPrivate,
        redirectTo: redirectPath,
        getPageConfig: Page.getPageConfig,
        exportPageConfig: Page.exportPageConfig,
      },
    }

    if (
      typeof appConfig === 'undefined'
      && typeof App.getAppConfig === 'function'
      && (
        (serverCtx.isDevServer && App.exportAppConfig)
        || (serverCtx.isExporting && App.exportAppConfig)
        || (serverCtx.isServer && !serverCtx.isDevServer && !serverCtx.isExporting && !App.exportAppConfig)
        || (isClient)
      )
    ) {
      appConfig = await _App.getAppConfig(firepressProps);
      Routes = _App.getRoutes(appConfig && appConfig.routes ? appConfig.routes : []);
      ctx = _App.getCtx(newBaseCtx, Routes);
      firepressProps = {
        ...firepressProps,
        appConfig,
        ctx,
        Routes,
      };
    }

    if (Page.isPrivate && isFirebaseAuthEnabled && isFirebaseAuthLoaded) {
      if (!App.firebase.auth().currentUser) {
        _App.redirectPrivatePage(Routes.Router, asPath);
      } else {
        pageConfig = await _App.getPageConfig(firepressProps);
      }
    } else if (
      !Page.isPrivate
      && (
        (serverCtx.isDevServer && Page.exportPageConfig)
        || (serverCtx.isExporting && Page.exportPageConfig)
        || (serverCtx.isServer && !serverCtx.isDevServer && !serverCtx.isExporting && !Page.exportPageConfig)
        || (isClient)
      )
    ) {
      pageConfig = await _App.getPageConfig(firepressProps);
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
    const Routes = _App.getRoutes(appConfig ? appConfig.routes : []);
    const hasPageFullLoaded = !firepressProps.ctx.pathname.includes('*');

    return {
      ...firepressProps,
      appConfig,
      pageConfig,
      Routes,
      hasPageFullLoaded,
    };
  }

  state = {
    appConfig: undefined,
    pageConfig: undefined,
    Routes: undefined,
    wasLoadedFromCache: false,
    hasPageFullLoaded: undefined,
  };

  unregisterAuthObserver;

  async componentDidMount () {
    const {
      Routes, appConfig, pageConfig, hasPageFullLoaded,
      isFirebaseAuthEnabled,
    } = this.state;

    if (isFirebaseAuthEnabled) {
      _App.setNextDataFirepressProps({
        isFirebaseAuthEnabled: true,
        isFirebaseAuthLoaded: false,
      });
      this.unregisterAuthObserver = App.firebase.auth().onAuthStateChanged((user) => {
        _App.setNextDataFirepressProps({ isFirebaseAuthLoaded: true });
        Routes.Router.pushRoute(Routes.Router.asPath);
      });
    }

    if (!appConfig || (appConfig && !pageConfig) || !hasPageFullLoaded) {
      Routes.Router.pushRoute(Routes.Router.asPath);
    }

    Routes.Router.beforePopState(() => {
      setTimeout(() => {
        this.setState({ wasLoadedFromCache: true });
      }, 0);
      document.getElementById('page').style.cssText = `
        visibility: hidden;
      `;
      return true;
    });
  }

  componentDidUpdate() {
    const { wasLoadedFromCache, pageConfig } = this.state;

    if (!pageConfig) {
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
      Routes, ctx,
      ctx: { pathname, query, asPath },
      hasPageFullLoaded,
    } = this.state;

    const pageMatches = Routes.routes
    .filter(route => !route.pattern.match(/:(?<=:)(.*)(?=\*)/g))
    .filter(route => route.regex.test(pathname));
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

    const canRenderApp = (typeof appConfig !== 'undefined');
    const AppLoader = App.AppLoader || _App.AppLoader;

    return canRenderApp ? (
      <App {...appProps} />
    ) : (
      <AppLoader />
    );
  }
}
