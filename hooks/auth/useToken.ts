import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import sendAxios from 'utils/sendAxios';
import Cookies from 'universal-cookie';

export default function useToken() {
    const router = useRouter();

    const refresh = useCallback(
        async (error) => {
            const {
                config,
                response: { status }
            } = error;

            const originalRequest = config;
            // token refresh 요청
            const axiosConfig = { method: 'post', url: `${process.env.API_HOST}/auth/refresh` };
            const success = async (res) => {
                const cookies = new Cookies();
                const autoLogin = cookies.get('sisterhongAutoLogin') ? true : false;
                res.autoLogin = autoLogin;

                originalRequest.headers.Authorization = `Bearer ${res.token}`;
                axios.defaults.headers.common.Authorization = `Bearer ${res.token}`;

                const config = { method: 'post', data: res, url: `${process.env.DOMAIN}/api/cookieToken` };

                await sendAxios({ config });
            };
            const fail = (err) => {
                if (status === 401 && err.message === 'RefreshTokenIsExpired') {
                    router.push({ pathname: '/logout', query: { returnUrl: router.asPath } });
                }
            };
            const data = await sendAxios({ config: axiosConfig, resFunc: success, errFunc: fail });

            if (data.state === 'success') {
                return await axios(originalRequest);
            }
        },
        [router]
    );

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response.status === 401 && error.response.data.message === 'TokenIsExpired') {
                    return await refresh(error);
                } else if (error.response.status === 401 && error.response.data.message === 'TokenDoesNotExist') {
                    router.push('/login');
                    return;
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }, []);
}
