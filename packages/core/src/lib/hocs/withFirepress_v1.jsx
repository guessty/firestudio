import * as React from 'react';
import { parse } from 'node-html-parser';
import unfetch from 'isomorphic-unfetch';
//
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

    const { Component: Page, ctx } = appContext;

    const isExporting = (!process.browser && !(ctx && ctx.req && ctx.req.headers));
    const isClient = (Boolean(process.browser) && !(ctx && ctx.req && ctx.req.headers));
    const isServer = (!process.browser && Boolean(ctx && ctx.req && ctx.req.headers));
    const isPrivate = Page.isPrivate && (isServer || (App.firebase && App.firebase.auth));
    const isAuthenticated = isClient && App.firebase && App.firebase.auth && App.firebase.auth().currentUser;

    if (Page.redirectTo) {
      if (isServer) {
        ctx.res.writeHead(302, {
          Location: Page.redirectTo,
        });
        ctx.res.end();
      } else if (isClient) {
        _App.Routes.Router.replaceRoute(Page.redirectTo);
      }
    }

    if (isClient && !Page.isDynamic && (!isPrivate || (isPrivate && isAuthenticated))) {
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
      && (!isPrivate || (isPrivate && isAuthenticated))
      && ((isExporting && !Page.isDynamic) || (isServer) || (isClient))) {
      pageProps = await Page.getInitialProps(ctx);
      if (!pageProps) {
        pageProps = {};
      }
      pageNeedsProps = false;
    }

    return {
      ...appProps,
      needsPageProps: pageNeedsProps,
      redirectTo: Page.redirectTo,
      isPrivate: Page.isPrivate,
      PageLoader: Page.Loader,
      pageProps,
    };
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
    const { needsPageProps, redirectTo, isPrivate } = this.props;
    const { router } = this.state;

    if (App.firebase && App.firebase.auth) {
      this.unregisterAuthObserver = App.firebase.auth().onAuthStateChanged((user) => {
        this.setState({ isAuthenticated: !!user });
      });
    }

    if (redirectTo) {
      _App.Routes.Router.replaceRoute(redirectTo);
    }
    
    if (!isPrivate && needsPageProps) {
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
    const { needsPageProps, redirectTo, isPrivate } = this.props;

    if (redirectTo) {
      _App.Routes.Router.replaceRoute(redirectTo);
    }

    if (isPrivate) {
      if (!isAuthenticated) {
        _App.Routes.Router.replaceRoute(App.redirectPrivatePagesTo || '/sign-in');
      } else if (isAuthenticated && needsPageProps) {
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
    const {
      Component: Page, PageLoader, isPrivate, needsPageProps, pageProps, ...props
    } = this.props;
    const { router, wasLoadedFromCache, isAuthenticated } = this.state;

    const isLoadingPage = needsPageProps;
    const Loader = PageLoader || App.PageLoader || _App.PageLoader;
    const _pageProps = {
      ...pageProps,
      isLoadingPage,
      Loader,
      wasLoadedFromCache,
    };
    const canReturnPage = !isPrivate || (isPrivate && isAuthenticated);
  
    const appProps = {
      ...props,
      router,
      Page: ({ children, ...extraProps }) => (
        <div
          id="page"
          className="flex flex-col flex-grow w-full"
        >
          {canReturnPage ? (
            <Page {..._pageProps} {...extraProps}>
              {children}
            </Page>
          ) : (
            <PageLoader />
          )}
        </div>
      ),
      pageProps: _pageProps,
    };

    return (
      <App {...appProps} />
    );
  }
};
