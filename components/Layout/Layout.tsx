import Head from 'next/head';
import Footer from './Footer';
import NavFloatingBar from '@components/NavFloatingBar';
import useGetPath from '@hooks/useGetPath';
import initMenu from 'utils/initMenu';
import React, { useEffect } from 'react';
import Header from './Header';
import MainBanner from '@components/mainBanner/MainBanner';
import { isMobileOnly } from 'react-device-detect';
import TopBtn from '@components/TopBtn';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@components/ErrorPage';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const url = useGetPath();
    const router = useRouter();

    function fallbackRender({ error }) {
        const explain = error.message;

        const errorData = {
            type: 'Error',
            title: '죄송합니다. 에러가 발생하였습니다.',
            explain: '',
            btn: '홈으로',
            link: '/'
        };

        return <ErrorPage data={errorData} explain={explain} />;
    }

    useEffect(() => {
        if (!url.includes('error')) {
            localStorage.setItem('url', router.asPath);
        }

        initMenu();
    }, [url]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            </Head>
            <div className="wrap">
                {isMobileOnly || <MainBanner />}
                <section id="main_content">
                    {url !== '/repair' && (
                        <>
                            <NavFloatingBar />
                            <Header />
                            <TopBtn />
                        </>
                    )}
                    <ErrorBoundary fallbackRender={fallbackRender}>
                        <div>{children}</div>
                    </ErrorBoundary>
                    <Footer />
                </section>
            </div>
            <style jsx>{`
                .wrap {
                    max-width: var(--max-width);
                    display: flex;
                    justify-content: center;
                    gap: var(--gap);
                    margin: 0 auto;
                    #main_content {
                        max-width: calc((var(--max-width) - var(--gap)) / 2);
                        overflow-x: hidden;
                        background: #fff;
                        box-shadow: 0 0 1px 1px #eee;
                    }
                }
            `}</style>
        </>
    );
};

export default Layout;
