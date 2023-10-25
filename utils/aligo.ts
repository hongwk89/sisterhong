import axios from 'axios';

interface cfData {
    [datas: string]: string;
}

interface cf {
    method: string;
    headers: {};
    data: cfData;
    url?: string;
}

export default async function aligo(name, option) {
    let config: cf = {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: { apikey: process.env.ALIGO_API_KEY, userid: process.env.ALIGO_ID }
    };

    switch (name) {
        case 'token':
            config.url = `${process.env.ALIGO_HOST}/akv10/token/create/30/s/`;
            break;
        case 'template':
            config.url = `${process.env.ALIGO_HOST}/akv10/template/list/`;
            config.data.token = option.token;
            config.data.senderkey = process.env.ALIGO_SENDER_KEY;
            config.data.tpl_code = 'TK_2410';
            break;
        case 'send':
            config.url = `${process.env.ALIGO_HOST}/akv10/alimtalk/send/`;
            config.data.senderkey = process.env.ALIGO_SENDER_KEY;
            config.data.tpl_code = 'TK_2410';
            config.data.sender = '02-6952-0989';
            config.data.receiver_1 = option.receiver_1;
            config.data.subject_1 = '홍언니고기';
            config.data.message_1 = option.message_1;
            config.data.testMode = 'Y';
            break;
        default:
            break;
    }

    const response = axios(config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            alert(err.data.message);
            return err;
        });

    return response;
}
