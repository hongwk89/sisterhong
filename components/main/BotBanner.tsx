import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function BotBanner() {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/banner/list/bot` };

            const result = await sendAxios({ config });

            setDatas(result);
        };

        getData();
    }, []);

    return (
        <>
            {datas && <CheckData data={datas}>{datas.state === 'success' && datas.data.length && <CustomImage src={datas.data[0].image} height={datas.data[0].height} alt={datas.data[0].title} width={datas.data[0].width} />}</CheckData>}
            <style jsx>{``}</style>
        </>
    );
}
