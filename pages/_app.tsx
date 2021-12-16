import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title='Chatify'
        description='Group chat communicator'
        openGraph={{
          type: 'website',
          title: 'Chatify',
          url: `https://${process.env.NEXT_PUBLIC_URL!}`,
          description: 'Group chat communicator',
          site_name: 'Chatify',
        }}
      />
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
        <link rel='icon' href='images/favicon.ico' type='image/x-icon' />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='images/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='images/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='images/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='images/apple-icon-180x180.png'
        />
      </Head>
      <ThemeProvider enableSystem={true} attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
