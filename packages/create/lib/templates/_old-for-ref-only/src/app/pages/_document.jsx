import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
//

class FirestudioDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&amp;subset=latin-ext"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default FirestudioDocument;
