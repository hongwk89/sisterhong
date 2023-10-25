import CheckData from '@components/CheckData';
import AfterAuth from '@components/mypage/info/AfterAuth';
import BeforeAuth from '@components/mypage/info/BeforeAuth';
import MypageTitle from '@components/mypage/MypageTitle';
import PageTitle from '@components/PageTitle';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function Info({ info }) {
    const [data, setData] = useState(info.data?.source !== 'M' ? info.data : null);
    const [page, setPage] = useState(info.data?.source !== 'M' ? true : false);

    return (
        <>
            <PageTitle title="홍언니고기 - 정보관리" />
            <MypageTitle back={true}>정보관리</MypageTitle>
            <CheckData data={info}>{info.state === 'success' && <>{page ? <AfterAuth data={data} /> : <BeforeAuth setPage={setPage} setData={setData} />}</>}</CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/auth/user-info`
    };
    const info = await sendAxios({ config, context });

    return {
        props: {
            info
        }
    };
};
