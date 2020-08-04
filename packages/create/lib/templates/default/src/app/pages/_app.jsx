import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { withFirepress } from '@firepress/core';
import { Application, Loader } from '@firepress/ui';
import { register, unregister } from 'next-offline/runtime';
import 'intersection-observer';

// global styles need to be imported before any project
// components to ensure component styles have higher priority.
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles.scss';

import initIcons from '@config/fontAwesome';
import firebase from '@config/firebase';
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';
import { wrapper } from '@store';

initIcons();

class App extends NextApp {
  static isClientFallbackEnabled = true;

  static isFirebaseAuthEnabled = true;

  static defaultClientFallbackPage = '/_error';

  static ROUTES = [
    ...(process.env.ROUTES || []).filter(route => route.pattern !== '/:args*'),
    { pattern: '/extra-route', page: '[...args]' },
    { pattern: '/route-with-dynamic-prop/12', page: '[...args]' },
  ];

  static redirectPrivatePagesTo = '/sign-in';

  static firebase = firebase;

  static PageLoader = () => (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Loader className="text-black" />
    </div>
  );

  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
  }

  render() {
    const { Component, router, pageProps } = this.props;

    return (
      <Application>
        <Head>
          <title>Firepress</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
        </Head>
        <Application.Screen>
          <Nav />
          <Main>
            <Component
              {...pageProps}
              firebase={App.firebase}
              PageLoader={App.PageLoader}
              router={router}
            />
          </Main>
        </Application.Screen>
        <Footer />
      </Application>
    );
  }
}

export default wrapper.withRedux(withFirepress(App));
