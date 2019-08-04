import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
//

class FirepressDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Exo+2:400,500,600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <div id="firestudioApp">
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    );
  }
}

export default FirepressDocument;
