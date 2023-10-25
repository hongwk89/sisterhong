import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ]
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+Khojki:wght@700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" type="image/ico" href={`${process.env.AWS_IMAGE_URL}/images/favicon.ico`} />
                    {process.env.APP_ENV !== 'prd' && <meta name="robots" content="noindex" />}
                    <meta name="Subject" content="호주산 소고기 양고기" />
                    <meta name="Title" content="홍언니고기" />
                    <meta name="Description" content='인기만점 캠핑세트, 프렌치랙, 홍.대.곱.창, 토마호크. 첫구매 소불고기300g 증정 / 청정 호주산 고기, A부터 Z까지! 믿고 먹을수 있는 근본있는 고기 "홍언니고기" 당일배송 서비스' />
                    <meta name="Keywords" content="홍언니, 홍언니고기, 소고기, 호주산 소고기, 양고기, 호주산, 호주산 양고기 " />
                    <meta property="og:url" content="https://sisterhong.kr/" />
                    <meta property="og:title" content="홍언니고기" />
                    <meta property="og:image" content="https://i.sisterhong.kr/public/images/share_image.png" />
                    <meta property="og:description" content="셀럽들이 사랑한 100% 호주산 근본있는고기!" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
