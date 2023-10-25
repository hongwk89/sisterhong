import CheckData from '@components/CheckData';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import SellList from './SellList';

export default function Promotion() {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/main/products?property=promotion` };

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
                        <SellList lists={datas.data} listWidth={1.8}>
                            기간한정 세일, 놓치면 후회할 가격
                        </SellList>
                    )}
                </CheckData>
            )}
        </>
    );
}
