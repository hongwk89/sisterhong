import CheckData from '@components/CheckData';
import ContactList from '@components/mypage/contact/ContactList';
import MypageTitle from '@components/mypage/MypageTitle';
import Link from 'next/link';
import sendAxios from 'utils/sendAxios';
import PageTitle from '@components/PageTitle';

export default function Contact({ data }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 1:1문의" />
            <MypageTitle back={true}>
                1:1문의
                {data.state === 'success' && data.data?.list.ask.length !== 0 && (
                    <Link legacyBehavior href="/mypage/contact/write">
                        <a>문의하기</a>
                    </Link>
                )}
            </MypageTitle>
            <CheckData data={data}>{data.state === 'success' && <ContactList data={data.data} />}</CheckData>
            <style jsx>{`
                a {
                    display: block;
                    border: 0.1rem solid var(--main-color);
                    padding: 0.5rem 1rem;
                    border-radius: 0.3rem;
                    color: var(--main-color);
                    font-size: 1.6rem;
                    font-weight: 500;
                    position: absolute;
                    top: 50%;
                    right: var(--side-padding);
                    transform: translateY(-50%);
                }
            `}</style>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/articles/ask`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
