import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="/images/favicon.ico" rel="shortcut icon" />
          <link href="/images/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/images/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <script src="https://www.google-analytics.com/analytics.js" async></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
