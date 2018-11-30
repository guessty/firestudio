import App, { Container } from 'next/app'
import Head from 'next/head'
import { withSPARouter } from 'next-spa/router'
import * as React from 'react'
//
import AppLayout from '@layouts/App'
import Loader from '@components/Loader'
import * as Store from '@store'
import { Provider } from '@store/store'
// import Toastr from '@components/Toastr'
//
require('sanitize.css');
require('./../styles.css')

interface IFirestudioAppProps {
  store: any
  pageProps: any
  pathname: string
  Component: React.Component
}


class FirestudioApp extends App<IFirestudioAppProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const propsToReturn = {
      pageProps: {
        PageLoader: Loader,
        ...pageProps,
      },
    }

    return propsToReturn
  }

  render() {
    const { Component, pageProps } = (this as any).props

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
    )
  }
}

export default withSPARouter(FirestudioApp)
