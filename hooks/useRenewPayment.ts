import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function useRenewPayment() {
    const [loading, setLoading] = useState(false);

    const renewData = async ({ params, setParams, data = null, success = null, fail = null }) => {
        setLoading(true);

        const datum = { cart_idx: params.products.map((val) => val.cart_idx), addr_idx: params.user.addr_idx, coupon_idx: params.discount.coupon_idx, serial_coupon: params.discount.serial_code, point_use: params.discount.point_use };

        if (data) {
            Object.keys(data).map((key) => {
                datum[key] = data[key];
            });
        }

        const config = {
            method: 'get',
            url: `${process.env.API_HOST}/orders/checkouts`,
            params: datum
        };

        const errFunc = (err) => {
            alert(err.message);
            if (fail) {
                fail(err);
            }
        };

        const resFunc = async (res) => {
            if (success) {
                success(res);
            }
            setParams(res);
        };

        await sendAxios({ config, resFunc, errFunc });
        setLoading(false);
    };

    return { loading, renewData };
}
