import * as React from 'react'
import { parse } from 'node-html-parser';
import unfetch from 'isomorphic-unfetch';
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

    if (isClient && !Component.isDynamic) {
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

    if (typeof Component.getPageData === 'function' && (
      (isExport && !Component.isDynamic) ||
      (isServer) || (isClient)
    )) {
      pageData = await Component.getPageData(ctx.query);

      if (!pageData) {
        pageData = null;
      }
    }

    const componentNeedsPageData = typeof pageData === 'undefined'
      && typeof Component.getPageData === 'function' && Component.isDynamic;

    const firestudioProps = {
      isDynamic: Component.isDynamic || false,
      pageData,
      componentNeedsPageData,
      PageLoader: Component.PageLoader || null,
      query: ctx.query,
    };

    return {
      ...appProps,
      firestudioProps,
    }
  }

  async componentDidMount() {
    const { router, firestudioProps: { componentNeedsPageData } } = this.props;
    
    if (componentNeedsPageData) {
      await _App.Routes.Router.pushRoute(router.asPath)
    }
  }

  render() {
    const { pageProps, firestudioProps, ...props } = this.props;

    const appProps = {
      ...props,
      pageProps: {
        ...pageProps,
        ...firestudioProps,
        isLoadingPage: firestudioProps.componentNeedsPageData,
        PageLoader: firestudioProps.PageLoader || App.PageLoader || _App.PageLoader,
      }
    }

    return <App {...appProps} />
  }
}
