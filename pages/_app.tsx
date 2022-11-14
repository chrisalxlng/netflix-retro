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
        <link rel="shortcut icon" href="/favicon.svg" />
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
