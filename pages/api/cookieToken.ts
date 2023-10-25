import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export function serverSideSetCookie({ res, token, expires = null, secure, autoLogin = null }) {
    if (autoLogin) {
        res.setHeader('Set-Cookie', serialize('sisToken', `${token}`, { expires, httpOnly: true, secure, path: '/' }));
    } else {
        res.setHeader('Set-Cookie', serialize('sisToken', `${token}`, { secure, httpOnly: true, path: '/' }));
    }
}

const cookieToken = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const secure = process.env.COOKIE_SECURE === 'true' ? true : false;
        const token = req.body.token;
        const autoLogin = req.body.autoLogin;

        if (req.body.autoLogin) {
            const expires = new Date(req.body.exp as string);

            serverSideSetCookie({ res, token, expires, secure, autoLogin });
        } else {
            serverSideSetCookie({ res, token, secure });
        }

        return res.status(200).json({ message: '토큰 쿠키에 설정완료' });
    } catch (err) {
        return res.status(500).json({ message: '토큰 쿠키에 설정실패' });
    }
};

export default cookieToken;
