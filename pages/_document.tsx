import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#7289DA' />
          <meta name='theme-color' content='#7289DA' />
          <meta name='application-name' content='Chatify' />
          <meta name='description' content='Group chat communicator' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='msapplication-tap-highlight' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta
            name='msapplication-TileImage'
            content='images/ms-icon-144x144.png'
          />
          <meta name='apple-mobile-web-app-title' content='Chatify' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Chatify' />
          <meta property='og:description' content='Group chat communicator' />
          <meta property='og:site_name' content='Chatify' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
