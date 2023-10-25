import useCartAmount from '../hooks/store/useCartAmount';
import sendAxios from './sendAxios';

export default async function cartAmountAxios() {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/shopping-carts/count`
    };
    await sendAxios({ config, resFunc: (res) => useCartAmount.setState({ amount: res.count }), errFunc: (err) => err.message });
}
