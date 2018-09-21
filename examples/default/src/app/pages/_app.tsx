import { withRedux } from 'firestudio'
import App, { Container } from 'firestudio/app'
import * as React from 'react'
import { Provider } from 'react-redux'
import styledSanitize from 'styled-sanitize'
import styled, { injectGlobal } from 'styled-components'
//
import initStore from '@store'
import Toastr from '@components/Toastr'
import * as Router from '@router'
//

injectGlobal`
  ${styledSanitize}
  html {
    font-size: 62.5%;
    overflow-x: hidden;
    font-family: 'Quicksand', sans-serif;
  }
  body {
    font-size: 1.4rem;
  }
  *, :before, :after, h1, h2, h3, h4, h5, h6, hr, p, ul, ol, dl {
    margin: 0;
  }
  hr {
    border: 0;
    border-bottom: 1px solid lightgrey;
  }
`

interface IFirestudioAppProps {
  store: any
  pageProps: any
  pathname: string
  Component: React.Component
}

const RenderType = styled.span`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    font-weight: bold;
    font-size: 16px;
    color: 'darkslategrey';
    border: 2px solid currentColor;
    border-radius: 24px;
    background: white;
    padding: 8px;
    opacity: 0.5;
    pointer-events: none;
  `

class FirestudioApp extends App<IFirestudioAppProps> {
  static async getInitialProps({Component, ctx}) {
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      pathname: ctx.pathname,
    }
  }
  render() {
    const { Component, pageProps, store, pathname } = (this as any).props
    const isPrerendered = Router.staticRoutes[pathname]

    return (
      <Container>
        <Provider store={store}>
          <div>
            <RenderType>
              {isPrerendered ? 'Pre-rendered Page' : 'Cloud Rendered Page'}
            </RenderType>
            <Toastr />
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(FirestudioApp)
