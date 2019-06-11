import * as React from 'react'
import App, { Container } from 'next/app'
//
import withPrismic from './../hocs/withPrismic'
import withDynamicRouter from './../hocs/withDynamicRouter'

class FirestudioApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withPrismic(withDynamicRouter(FirestudioApp));
