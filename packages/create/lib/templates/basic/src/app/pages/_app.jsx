import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { withDynamicRouter, withPrismic } from '@firestudio/core';
import { Loader } from '@firestudio/ui';
//
import Page from '@templates/Page';
import Store from '@store';
import initIcons from '@config/fontAwesome';
//
require('sanitize.css');
require('./../styles.scss');

initIcons();

class FirestudioApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const propsToReturn = {
      pageProps: {
        PageLoader: Loader,
        ...pageProps,
      },
    };

    return propsToReturn;
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Head>
          <title>Firestudio</title>
        </Head>
        <Store>
          <Page router={router}>
            <Component {...pageProps} />
          </Page>
        </Store>
      </Container>
    );
  }
}

export default withPrismic(withDynamicRouter(FirestudioApp));
