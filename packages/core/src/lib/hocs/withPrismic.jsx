import * as React from 'react';
//
import prismic from '../helpers/prismic';
//

export default (App) => class _App extends React.Component {
  static async getInitialProps(appContext) {
    const appProps = (typeof App.getInitialProps === 'function') ?
      await App.getInitialProps(appContext) : {}

    const { Component } = appContext;

    let prismicPageData;
    if (Component.PRISMIC_PAGE_TYPE) {
      prismicPageData = await prismic.getPageData(Component.PRISMIC_PAGE_TYPE);
    }

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps || {},
        ...prismicPageData ? { prismicPageData } : {},
      },
    }
  }

  render() {
    return <App {...this.props} />
  }
}
