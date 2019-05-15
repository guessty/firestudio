import App, { Container } from 'next/app';
import Head from 'next/head';
import { withSPARouter } from 'next-spa/router';
import React from 'react';
import cookies from 'browser-cookies';
//
import AppLayout from '@templates/App';
import Loader from '@elements/Loader';
import Store from '@store';
import { Api } from '@store/containers';
import initIcons from '@config/fontAwesome';
//
require('sanitize.css');
require('./../styles.scss');

initIcons();

class FirestudioApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = typeof ctx.req !== 'undefined';
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!isServer) {
      await FirestudioApp.ensureCSRF();
    }

    const propsToReturn = {
      pageProps: {
        PageLoader: Loader,
        ...pageProps,
      },
    };

    return propsToReturn;
  }

  static async ensureCSRF() {
    if (!cookies.get('XSRF-TOKEN')) {
      await Api.send({
        url: Api.ROUTES.CSRF,
        method: 'get',
      });
    }
  }

  async componentDidMount() {
    await FirestudioApp.ensureCSRF();
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
