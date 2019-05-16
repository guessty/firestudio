import App, { Container } from 'next/app';
import Head from 'next/head';
import { withSPARouter } from 'next-spa/router';
import React from 'react';
//
import AppLayout from '@templates/App';
import Loader from '@elements/Loader';
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
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Firestudio</title>
        </Head>
        <Store>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Store>
      </Container>
    );
  }
}

export default withSPARouter(FirestudioApp);
