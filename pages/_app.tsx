import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

export default function Nextra({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <style>{`body { background-color: #f8f7f2 !important;}`}</style> */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />

        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
