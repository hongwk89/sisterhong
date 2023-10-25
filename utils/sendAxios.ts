import axios from 'axios';
export interface tokenData {
    idx: number;
    token: string;
    exp: string;
}

export default async function sendAxios({ config, context = null, resFunc = null, errFunc = null }) {
    let data = { state: null, data: null };
    const token: tokenData = context?.res.getHeader('x-tokendata');
    const debug = context?.req.headers['x-sisterhong-debug'] || false;

    const newConfig = token ? { ...config, headers: { Authorization: `Bearer ${token}`, 'x-sisterhong-debug': debug } } : { ...config, headers: { 'x-sisterhong-debug': debug } };

    await axios(newConfig)
        .then((datas) => {
            const result_data = datas.data;
            data = { state: 'success', data: result_data };

            if (resFunc) {
                resFunc(result_data);
            }
        })
        .catch((error) => {
            if (error.response?.data) {
                const error_data = error.response.data;
                data = { state: 'fail', data: error_data };

                if (errFunc && error_data.message !== 'TokenIsExpired') {
                    errFunc(error_data);
                }
            }
        });

    return data;
}
