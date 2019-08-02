import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { withFirepress } from '@firestudio/core/app';
import { Application, Loader } from '@firestudio/ui';

// global styles need to be imported before any project
// components to ensure component styles have higher priority.
import '../styles.scss';

import * as projectStore from '@store';
import initIcons from '@config/fontAwesome';
import firebase from '@config/firebase';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';

initIcons();

class App extends NextApp {
  static PageLoader = Loader

  static firebase = firebase

  static storeConfig = {
    stateContainers: projectStore,
  }

  // static redirectPrivatePagesTo = '/'

  render() {
    const { Page } = this.props;

    return (
      <Application>
        <Head>
          <title>Firepress</title>
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

export default withFirepress(App);
