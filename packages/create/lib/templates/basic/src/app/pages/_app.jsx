import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import connectFirestudio from '@firestudio/core';
import { Application, Loader } from '@firestudio/ui';
//
import * as store from '@store';
import initIcons from '@config/fontAwesome';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';
//
require('sanitize.css');
require('./../styles.scss');

initIcons();

class App extends NextApp {
  static PageLoader = Loader

  render() {
    const { Component: Page, pageProps } = this.props;

    return (
      <Application store={store}>
        <Head>
          <title>Firestudio</title>
        </Head>
        <Application.Window>
          <Nav />
          <Main>
            <Application.PageTransition {...pageProps}>
              <Page {...pageProps} />
            </Application.PageTransition>
          </Main>
        </Application.Window>
        <Footer />
      </Application>
    );
  }
}

export default connectFirestudio(App);
