import sendAxios from './sendAxios';

export default async function paymentAxios(params, setPrices, func = null) {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/orders/checkouts`,
        params: params
    };
    const success = (res) => {
        setPrices(res.payment);
        if (func) {
            func();
        }
    };
    await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
}
