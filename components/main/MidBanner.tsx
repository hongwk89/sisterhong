import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function MidBanner() {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/banner/list/mid` };

            const result = await sendAxios({ config });

            setDatas(result);
        };

        getData();
    }, []);

    return (
        <>
            {datas && (
                <CheckData data={datas}>
                    {datas.state === 'success' && datas.data.length && (
                        <Link href={`${datas.data[0].target_url ? datas.data[0].target_url : '/'}`} passHref>
                            <CustomImage src={datas.data[0].image} height={datas.data[0].height} alt={datas.data[0].title} width={datas.data[0].width} />
                        </Link>
                    )}
                </CheckData>
            )}
            <style jsx>{``}</style>
        </>
    );
}
