import App, { Container } from 'next/app';
import Head from 'next/head';
import { withSPARouter } from 'next-spa/router';
import React from 'react';
//
import AppLayout from '@layouts/App';
import Loader from '@elements/Loader';
import * as Store from '@store';
import { Provider } from '@store/store';
import initIcons from '@config/fontAwesome';
// import Toastr from '@components/Toastr'
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
        <Provider store={Store}>
          <AppLayout>
            {/* <Toastr /> */}
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      </Container>
    );
  }
}

export default withSPARouter(FirestudioApp);
