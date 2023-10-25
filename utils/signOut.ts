import axios from 'axios';
import Cookies from 'universal-cookie';
import { NextRouter } from 'next/router';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import sendAxios from './sendAxios';

type routerUrl = '/' | '/login';

export default async function signOut(router: NextRouter, url: routerUrl = '/') {
    const cookies = new Cookies();

    const config = {
        method: 'post',
        url: `${process.env.DOMAIN}/api/logout`
    };

    await sendAxios({ config });

    cookies.remove('sisterhongAutoLogin', { path: '/' });
    delete axios.defaults.headers.common.Authorization;
    useTokenStore.setState({ token: false });

    if (url === '/login') {
        const returnUrl = router.query.returnUrl ? decodeURIComponent(decodeURIComponent(router.query.returnUrl as string)) : '';

        router.replace({ pathname: '/login', query: { returnUrl } });
    } else {
        router.replace(url);
    }
}
