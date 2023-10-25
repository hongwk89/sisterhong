import sendAxios from './sendAxios';

export default async function sendError(error) {
    const config = {
        method: 'post',
        url: `${process.env.DOMAIN}/api/errorLog`,
        data: { error }
    };

    await sendAxios({ config });
}
