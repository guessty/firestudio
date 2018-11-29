import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
//

interface IFirestudioDocumentProps {
  styleTags: any
}

class FirestudioDocument extends Document<IFirestudioDocumentProps> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    const { styleTags } = (this as any).props
    return (
      <html>
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,700&amp;subset=latin-ext"
            rel="stylesheet"
          />
          {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default FirestudioDocument
