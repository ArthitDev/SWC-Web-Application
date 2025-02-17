import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="th">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Smart Wound Care - วินิจฉัยและให้คำแนะนำในการดูแลรักษาแผลด้วย AI (AI-powered wound care diagnosis and recommendations)"
          />
          <meta
            name="keywords"
            content="Wound Care, AI, Smart Wound Care, วิธี , รักษาแผล, วินิจฉัยแผล ,ปัญญาประดิษฐ์ , เอไอ ,AI wound care, wound diagnosis"
          />
          <meta
            property="og:title"
            content="SWC Web Application - ให้ข้อมูลแผลและวิเคราะห์รูปแผลด้วย AI"
          />
          <meta
            property="og:description"
            content="Smart Wound Care - วินิจฉัยแผลด้วย AI และให้ข้อมูลในการดูแลรักษา (AI-powered wound care diagnosis and recommendations)"
          />
          <meta property="og:url" content="https://smartwoundcare.site" />
          <meta property="og:image" content="/images/og-image.webp" />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="th, en" />
          <meta name="author" content="SWC Development Team (641413017)" />
          <meta property="og:locale" content="th_TH" />
          <meta property="og:locale:alternate" content="en_US" />
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
