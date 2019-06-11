import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { withDynamicRouter, withPrismic } from '@firestudio/core';
import { Loader, PageTransition } from '@firestudio/ui';
//
import Store from '@store';
import initIcons from '@config/fontAwesome';
import Page from '@templates/Page';
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
    const { Component, pageProps: { transitionProps, ...pageProps } } = this.props;

    return (
      <>
        <Head>
          <title>Firestudio</title>
        </Head>
        <Store>
          <Page>
            <PageTransition transitionProps={transitionProps} className="w-full">
              <Component {...pageProps} />
            </PageTransition>
          </Page>
        </Store>
      </>
    );
  }
}

export default withPrismic(withDynamicRouter(FirestudioApp));
