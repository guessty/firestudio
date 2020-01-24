import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
//
import withFirepress from '../hocs/withFirepress';

class App extends NextApp {
  render() {
    const { Page } = this.props;

    return (
      <>
        <Head>
          <title>Firepress</title>
        </Head>
        <Page />
      </>
    );
  }
}

export default withFirepress(App);
