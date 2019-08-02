import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
//
import Store from '../components/Store';
import withFirepress from '../hocs/withFirepress';

class App extends NextApp {
  render() {
    const { Page } = this.props;

    return (
      <Store>
        <Head>
          <title>Firepress</title>
        </Head>
        <Page />
      </Store>
    );
  }
}

export default withFirepress(App);
