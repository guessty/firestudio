import App, { Container } from 'next/app';
import Head from 'next/head';
import { withRouter } from '@firestudio/core';
import React from 'react';
//
import Prismic from '@plugins/Prismic';
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
    let prismicData;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (Component.PRISMIC_TYPE) {
      prismicData = await Prismic.getByType(Component.PRISMIC_TYPE);
    }

    const propsToReturn = {
      pageProps: {
        PageLoader: Loader,
        ...typeof prismicData !== 'undefined' ? {
          prismicData,
        } : {},
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

export default withRouter(FirestudioApp);
