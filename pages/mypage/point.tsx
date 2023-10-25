import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import PointList from '@components/mypage/point/PointList';
import PageTitle from '@components/PageTitle';
import sendAxios from 'utils/sendAxios';

interface point {
    amount: number;
    balance: number;
    comment: string;
    order_idx: number;
    use: string;
}

export default function Point({ data }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 적립금" />
            <MypageTitle back={true}>적립금</MypageTitle>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="list">
                            <ul>
                                {data.data.points.map((list: point, idx: number) => (
                                    <PointList key={idx} data={list} />
                                ))}
                            </ul>
                            <p>적립금은 적립일로부터 6개월 이후 자동소멸됩니다.</p>
                        </div>
                        <style jsx>{`
                            .list {
                                padding: 2rem var(--side-padding);
                                p {
                                    padding: 2rem 0;
                                    font-size: 1.4rem;
                                    color: #a2a2a2;
                                    font-weight: 500;
                                    text-align: center;
                                }
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/auth/user-points`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
