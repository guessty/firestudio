import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import connectFirestudio from '@firestudio/core';
import { Application, Loader } from '@firestudio/ui';

// global styles need to be imported before any project
// components to ensure component styles have higher priority.
import '../styles.scss';

import * as store from '@store';
import initIcons from '@config/fontAwesome';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';

initIcons();

class App extends NextApp {
  static PageLoader = Loader

  render() {
    const { Page } = this.props;

    return (
      <Application store={store}>
        <Head>
          <title>Firestudio</title>
        </Head>
        <Application.Screen>
          <Nav />
          <Main>
            <Page />
          </Main>
        </Application.Screen>
        <Footer />
      </Application>
    );
  }
}

export default connectFirestudio(App);
