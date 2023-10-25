import CheckData from '@components/CheckData';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import SellList from './SellList';

export default function Benefit() {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/main/products?property=benefit` };

            const result = await sendAxios({ config });

            setDatas(result);
        };

        getData();
    }, []);

    return (
        <>
            {datas && (
                <CheckData data={datas}>
                    {datas.state === 'success' && (
                        <SellList lists={datas.data} listWidth={2.5}>
                            합리적인 가격, 가성비 甲!
                        </SellList>
                    )}
                </CheckData>
            )}
            <style jsx>{``}</style>
        </>
    );
}
