import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { withFirepress, withRedux } from '@firepress/core/app';
import { Application, Loader } from '@firepress/ui';

// global styles need to be imported before any project
// components to ensure component styles have higher priority.
import '../styles.scss';

// import * as projectStore from '@store';
import initIcons from '@config/fontAwesome';
import firebase from '@config/firebase';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';
import { initStore } from '@store';

initIcons();

class App extends NextApp {
  static redirectPrivatePagesTo = '/sign-in';

  static PageLoader = () => (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Loader />
    </div>
  );

  static firebase = firebase;

  static exportAppConfig = true

  static async getAppConfig() {
    return {
      routes: [
        { pattern: '/extra-route', page: '_*' },
        { pattern: '/route-with-dynamic-prop/:prop', page: '_*' },
      ],
    };
  }

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

export default withRedux(initStore)(withFirepress(App));
