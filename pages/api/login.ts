import { NextApiRequest, NextApiResponse } from 'next';
import sendAxios from 'utils/sendAxios';
import { serialize } from 'cookie';

interface memData {
    auth: 'T' | 'F'; // (T:인증된 회원, F:인증안된 회원)
    user_type: 'M' | 'B' | 'N'; // (M:마이그레이션전 회원, B:비지니스 회원, N:일반 회원)
    source: 'M' | 'K' | 'N'; // (M:일반회원, K:카카오 소셜 회원, N:네이버 소셜 회원)
}

interface reqData {
    autoLogin: string;
    saveId: string;
}

interface cookieData {
    setSaveId: string;
    deleteSaveId: string;
    setAutoLogin: string;
    setToken: string;
}

interface resultData {
    token: String;
    exp: string;
}

const getCookieData = (req_data: reqData, result_data: resultData): cookieData => {
    const setSaveId = serialize('sisterhongId', req_data.saveId, { maxAge: 3600 * 24 * 365, path: '/' });
    const deleteSaveId = serialize('sisterhongId', req_data.saveId, { maxAge: 0, path: '/' });
    const setAutoLogin = serialize('sisterhongAutoLogin', `true`, { expires: new Date(result_data.exp), path: '/' });
    const setToken = serialize('sisToken', `${result_data.token}`, { expires: new Date(result_data.exp), httpOnly: true, secure: process.env.COOKIE_SECURE === 'true' ? true : false, path: '/' });

    return { setSaveId, deleteSaveId, setAutoLogin, setToken };
};

const selectDatas = (req_data: reqData, cookieData: cookieData): string[] => {
    const { setSaveId, deleteSaveId, setAutoLogin, setToken } = cookieData;

    if (req_data.autoLogin && req_data.saveId) {
        return [setToken, setSaveId, setAutoLogin];
    }
    if (req_data.autoLogin && !req_data.saveId) {
        return [setToken, setAutoLogin, deleteSaveId];
    }
    if (req_data.saveId) {
        return [setToken, setSaveId];
    }
    return [setToken, deleteSaveId];
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const req_data = req.body;
        const config = {
            url: `${process.env.API_HOST}/auth/sign-in`,
            method: 'post',
            data: req_data
        };
        const result = await sendAxios({ config });

        if (result.state === 'success') {
            const cookieData = getCookieData(req_data, result.data);
            const cookieDataArr = selectDatas(req_data, cookieData);

            res.setHeader('Set-Cookie', cookieDataArr);

            const returnUrl = req.headers.referer?.includes('returnUrl') ? req.headers.referer.split(/returnUrl\=|\&/g)[1] : '/';

            return res.status(200).json({ url: returnUrl, token: result.data.token, user_type: result.data.user_type });
        }

        return res.status(400).json({ message: result.data.message });
    } catch (err) {
        return res.status(500).json({ message: '로그인 실패' });
    }
};

export default login;
