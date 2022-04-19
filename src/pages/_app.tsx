import '../styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Head>
                    <title>Matchmaking - Isatis Business Solutions</title>
                    <link rel="favicon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}

export default MyApp
