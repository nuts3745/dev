import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content="nuts3745.dev" />
          <link rel="icon" href="/favicon.ico" sizes="48x48" />
          <link
            rel="icon"
            href="/favicon.svg"
            sizes="any"
            type="image/svg+xml"
          />
          <meta name="apple-mobile-web-app-title" content="nuts3745.dev" />
          <meta name="application-name" content="nuts3745.dev" />
          <meta charSet="UTF-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
