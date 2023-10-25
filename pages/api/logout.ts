import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import axios from 'axios';

const logout = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Set-Cookie', serialize('sisToken', ``, { maxAge: 0, path: '/' }));
        delete axios.defaults.headers.common.Authorization;
    } catch {
        return res.status(500).json({ message: '쿠키 삭제 실패' });
    }

    return res.status(200).json({ message: '쿠키 삭제 성공' });
};

export default logout;
