import Layout from '../components/Layout/Layout';
import '@styles/globals.scss';
import Script from 'next/script';
import useToken from '@hooks/auth/useToken';
import axios from 'axios';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import { useEffect } from 'react';
import Analytics from '@components/Analytics';

function MyApp({ Component, pageProps, sisToken }) {
    useToken();

    if (sisToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${sisToken}`;
    }

    useEffect(() => {
        useTokenStore.setState({ token: sisToken ? true : false });
    }, []);

    return (
        <>
            <Script src="/kakao-login.js" strategy="beforeInteractive" />
            {!sisToken && <Script src="/naver-login-nopolyfill.js" strategy="beforeInteractive" />}
            <Analytics />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

MyApp.getInitialProps = ({ ctx }) => {
    const cookie = ctx.req?.headers.cookie;
    let sisToken = '';

    if (cookie?.includes('sisToken')) {
        sisToken = cookie.split('sisToken=')[1].split(';')[0];
    }

    return { sisToken };
};

export default MyApp;
