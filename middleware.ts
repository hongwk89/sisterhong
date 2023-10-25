import { NextResponse, NextRequest } from 'next/server';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

import axios from 'axios';

const PRIVATE_URL = ['/mypage', '/cart', '/order'];
const PUBLIC_URL = ['/login', '/join'];

const redirectRepairingPage = (request) => {
    // 홈페이지 점검중일 경우
    // 개발자는 구글크롬확장 프로그램 MODHEADER 설치후 헤더에 x-sisterhong-debug : true로 전달
    if (process.env.REPAIRING === 'false') {
        return false;
    }

    if (request.nextUrl.pathname === '/repair') {
        return false;
    }

    if (request.headers.get('x-sisterhong-debug') === 'true') {
        return false;
    }

    return true;
};

const memberCheck = (request) => {
    if (request.nextUrl.pathname === '/login/memberCheck') {
        return true;
    }

    return false;
};

const pageTypeCheck = (request) => {
    if (PRIVATE_URL.some((cur) => request.nextUrl.pathname.includes(cur))) {
        return 'private';
    }
    if (request.nextUrl.pathname !== '/join/joinComplete' && PUBLIC_URL.some((cur) => request.nextUrl.pathname.includes(cur))) {
        return 'public';
    }
};

const checkToken = async (token: string, request) => {
    const axiosInstance = axios.create({
        adapter: fetchAdapter,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await axiosInstance
        .post(`${process.env.API_HOST}/auth/refresh`)
        .then((res) => {
            const autoLogin = request.cookies.get('sisterhongAutoLogin');
            const response = NextResponse.next();
            const expires = new Date(res.data.exp);
            const secure = process.env.COOKIE_SECURE === 'true';

            response.headers.set('x-tokendata', res.data.token);

            if (autoLogin) {
                response.cookies.set('sisToken', res.data.token, { expires, httpOnly: true, secure, path: '/' });
            } else {
                response.cookies.set('sisToken', res.data.token, { httpOnly: true, secure, path: '/' });
            }
            return response;
        })
        .catch((err) => {
            return err;
        });

    if (data.response?.status === 401 && data.response?.data?.message === 'RefreshTokenIsExpired') {
        return false;
    }

    return data;
};

export default async function Middleware(request: NextRequest) {
    const redirectRepair = redirectRepairingPage(request);

    if (redirectRepair) {
        return NextResponse.redirect(new URL(`${process.env.DOMAIN}/repair`, request.url));
    }

    const isPrefetch = request.headers.get('x-middleware-prefetch');

    if (!isPrefetch) {
        const memberCheckPage = memberCheck(request);

        if (!memberCheckPage) {
            const token = request.cookies.get('sisToken')?.value;
            const pageType = pageTypeCheck(request);

            if (token) {
                if (pageType === 'private') {
                    const data = await checkToken(token, request);

                    if (!data) {
                        return NextResponse.redirect(new URL(`${process.env.DOMAIN}/logout?returnUrl=${request.nextUrl.pathname}&errorType=RefreshTokenIsExpired`, request.url));
                    }

                    return data;
                }
                if (pageType === 'public') {
                    return NextResponse.redirect(new URL(`${process.env.DOMAIN}/mypage`, request.url));
                }
            } else {
                if (pageType === 'private') {
                    return NextResponse.redirect(new URL(`${process.env.DOMAIN}/login?returnUrl=${request.nextUrl.pathname}`, request.url));
                }
            }

            return NextResponse.next();
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|static|favicon.ico|_next|images|.*js).*)']
};
