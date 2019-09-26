import * as React from 'react';
import { parse } from 'node-html-parser';
import unfetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
//
const buildRoutes = require('./../build/routes')
//

export default (App) => class _App extends React.Component {
  static AppLoader = () => (
    <h2 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading App...</h2>
  )

  static PageLoader = () => (
    <h2 style={{ padding: '60px 20px', textAlign: 'center' }}>Loading Page...</h2>
  )

  static Routes = buildRoutes(process.env.ROUTES || [])

  static async getInitialProps(appContext) {
    const initialProps = (typeof App.getInitialProps === 'function') ?
      await App.getInitialProps(appContext) : {}
    
    const { Component: Page, ctx } = appContext;

    const isExporting = (!process.browser && !(ctx && ctx.req && ctx.req.headers));
    const isClient = (Boolean(process.browser) && !(ctx && ctx.req && ctx.req.headers));
    const isServer = (!process.browser && Boolean(ctx && ctx.req && ctx.req.headers));
    const { IS_SPA: isSPA } = publicRuntimeConfig;

    if (Page.redirectTo) {
      if (isServer && !isSPA) {
        ctx.res.writeHead(302, {
          Location: Page.redirectTo,
        });
        ctx.res.end();
      } else if (isClient) {
        _App.Routes.Router.replaceRoute(Page.redirectTo);
      }
    }

    if (!isSPA && isClient && !Page.isDynamic) {
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

    let pageNeedsProps = typeof Page.getInitialProps === 'function';
    let pageProps = {};
    if (pageNeedsProps
      && ((isExporting && !Page.isDynamic) || (isServer && !isSPA) || (isClient))) {
      pageProps = await Page.getInitialProps(ctx);
      if (!pageProps) {
        pageProps = {};
      }
      pageNeedsProps = false;
    }

    let appNeedsProps = typeof App.getAppProps === 'function';
    let appProps = {};
    if (appNeedsProps
      && (isServer && !isSPA)) {
      appProps = await App.getAppProps();
      if (!appProps) {
        appProps = {};
      }
      appNeedsProps = false;
    }

    return {
      ...initialProps,
      appProps,
      appNeedsProps,
      pageNeedsProps,
      redirectTo: Page.redirectTo,
      isClient,
      isSPA,
      PageLoader: Page.Loader,
      pageProps,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const router = typeof window !== 'undefined' ? _App.Routes.Router : {
      router: props.router,
    };

    return {
      appProps: state.appProps || props.appProps,
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
    appProps: undefined,
  }

  async componentDidMount() {
    const { appNeedsProps, pageNeedsProps, redirectTo, isSPA, isClient } = this.props;
    const { router } = this.state;

    if (appNeedsProps) {
      const appProps = await App.getAppProps();
      this.setState({
        appProps,
      });
    }

    if (redirectTo) {
      _App.Routes.Router.replaceRoute(redirectTo);
    }
    
    if (pageNeedsProps || (isSPA && !isClient)) {
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
    const { wasLoadedFromCache, router } = this.state;
    const { pageNeedsProps, redirectTo } = this.props;

    if (redirectTo) {
      _App.Routes.Router.replaceRoute(redirectTo);
    }

    if (pageNeedsProps) {
      _App.Routes.Router.pushRoute(router.router.asPath);
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

  render() {
    const {
      Component: Page, PageLoader, pageNeedsProps, isClient, isSPA, pageProps,
    } = this.props;
    const { appProps, router, wasLoadedFromCache } = this.state;

    const isLoadingPage = pageNeedsProps;
    const Loader = PageLoader || App.PageLoader || _App.PageLoader;
    const _pageProps = {
      ...pageProps,
      isLoadingPage,
      Loader,
      wasLoadedFromCache,
    };
  
    const _appProps = {
      ...typeof appProps !== 'undefined' ? appProps : {},
      router,
      Page: ({ children, ...extraProps }) => (
        <div
          id="page"
          className="flex flex-col flex-grow w-full"
        >
          <Page {..._pageProps} {...extraProps}>
            {children}
          </Page>
        </div>
      ),
      pageProps: _pageProps,
    };

    const canRenderApp = !isSPA || (isSPA && isClient);
    const AppLoader = App.AppLoader || _App.AppLoader;

    return canRenderApp ? (
      <App {..._appProps} />
    ) : (
      <AppLoader />
    );
  }
};
