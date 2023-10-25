import useTokenStore from '@hooks/store/auth/useTokenStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PRIVATE_URL = ['/mypage', '/cart', '/order'];
const PUBLIC_URL = ['/login', '/join'];
const URLS = [...PRIVATE_URL, ...PUBLIC_URL];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const { token } = useTokenStore();
    const [authorized, setAuthorized] = useState<boolean>(false);

    const authCheck = (url: string) => {
        const path = url.split('?')[0];

        if (!token && PRIVATE_URL.includes(path)) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else if (token && PUBLIC_URL.includes(path)) {
            router.push({
                pathname: '/mypage'
            });
        } else {
            setAuthorized(true);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            const hideContent = () => {
                const check = URLS.includes(router.pathname);

                if (check) {
                    setAuthorized(false);
                } else {
                    setAuthorized(true);
                }
            };
            const showContent = (url: string) => {
                if (!authorized) {
                    authCheck(url);
                }
            };

            showContent(router.asPath);

            router.events.on('routeChangeStart', hideContent);
            router.events.on('routeChangeComplete', showContent);

            return () => {
                router.events.off('routeChangeStart', hideContent);
                router.events.off('routeChangeComplete', showContent);
            };
        }
    }, [router.isReady, token]);

    return children;
}
