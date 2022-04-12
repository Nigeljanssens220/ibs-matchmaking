import '../styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Head>
                    <title>Matchmaking - Isatis Business Solutions</title>
                    <link rel="favicon" href="/favicon.ico" />
                </Head>
                <Header />
                <Component {...pageProps} />
                <Footer>
                    © Isatis Business Solutions 2022. All Rights Reserved.
                </Footer>
            </SessionProvider>
        </>
    )
}

export default MyApp
