import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ShowProvider } from '@src/contexts';
import '../styles.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>netflixretro</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.0.1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.0.1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.0.1" />
        <link rel="manifest" href="/site.webmanifest?v=1.0.1" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.0.1" color="#e03131" />
        <link rel="shortcut icon" href="/favicon.ico?v=1.0.1" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <MantineProvider
        theme={{ primaryColor: 'red', primaryShade: { light: 8, dark: 8 } }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-right">
          <ShowProvider>
            <Component {...pageProps} />
          </ShowProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
