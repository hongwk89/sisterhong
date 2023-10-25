import { NextApiRequest, NextApiResponse } from 'next';

const errorLog = async (req: NextApiRequest, res: NextApiResponse) => {
    console.error(req.body.error);
    // 로그 처리 로직

    res.status(200).end();
};

export default errorLog;
