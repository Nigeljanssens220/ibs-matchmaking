import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Toaster />
            <Head>
                <title>Matchmaking - Isatis Business Solutions</title>
                <link rel="favicon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
