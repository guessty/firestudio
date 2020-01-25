import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { withFirepress } from '@firepress/core/app';
import { withRedux } from '@firepress/store';
import { Application, Loader } from '@firepress/ui';

// global styles need to be imported before any project
// components to ensure component styles have higher priority.
import '../styles.scss';

import initIcons from '@config/fontAwesome';
import firebase from '@config/firebase';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';
import { initStore } from '@store';

initIcons();

class App extends NextApp {
  static redirectPrivatePagesTo = '/sign-in';

  // static exportAppConfig = true

  static firebase = firebase;

  // Method to mock api delays
  static sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  static PageLoader = () => (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Loader />
    </div>
  );

  static async getAppConfig() {
    await App.sleep(2000);

    return {
      routes: [
        { pattern: '/extra-route', page: '_*' },
        { pattern: '/route-with-dynamic-prop/:prop', page: '_*' },
      ],
    };
  }

  render() {
    const { Page, store } = this.props;

    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default withRedux(initStore)(withFirepress(App));
