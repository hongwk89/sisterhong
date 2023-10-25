import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import PageTitle from '@components/PageTitle';
import ImageFilter from 'react-image-filter';
import endDate from 'utils/endDate';
import HexToRgb from 'utils/hexToRgb';
import sendAxios from 'utils/sendAxios';

interface myPageCoupon {
    background_color: string;
    coupon_name: string;
    description: string;
    usable_end_date: string;
}

export default function Coupon({ data, time }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 쿠폰" />
            <MypageTitle back={true}>쿠폰</MypageTitle>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <ul className="page">
                            {data.data.list.length !== 0 ? (
                                data.data.list.map((list: myPageCoupon, idx: number) => {
                                    const { leftTime, end_date } = endDate(list, time);
                                    const { r, g, b } = HexToRgb(list.background_color);

                                    return (
                                        <li key={idx} className="coupon">
                                            <ImageFilter image={`${process.env.AWS_IMAGE_URL}/images/coupon.png`} filter={'duotone'} colorOne={[0, 0, 0]} colorTwo={[r, g, b]} />
                                            <span className="text">COUPON</span>
                                            <div className="content">
                                                <p className="name">{list.coupon_name}</p>
                                                <p className={`date ${leftTime <= 48 ? 'on' : ''}`}>
                                                    사용기한 : {end_date}까지
                                                    {leftTime <= 48 && ` (만료까지 ${leftTime.toString()}시간)`}
                                                </p>
                                                <p className="desc">{list.description}</p>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <p className="empty">보유하신 쿠폰이 없습니다</p>
                            )}
                        </ul>
                        <style jsx>{`
                            .empty {
                                text-align: center;
                                font-size: 1.4rem;
                                color: #a2a2a2;
                            }
                            .page {
                                padding: 0 var(--side-padding-inner) 5rem;
                            }
                            .coupon {
                                position: relative;
                                margin-bottom: 2.7rem;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .text {
                                    display: block;
                                    position: absolute;
                                    top: 50%;
                                    right: 8.1%;
                                    transform-origin: right;
                                    transform: translateY(-50%) rotateZ(-90deg) translateX(50%);
                                    font-size: 5vw;
                                    font-family: 'roboto';
                                    color: #fff;
                                    font-weight: bold;
                                }
                                .content {
                                    position: absolute;
                                    top: 3vw;
                                    left: 5vw;
                                    .name {
                                        font-size: 5.5vw;
                                        color: #fff;
                                        font-weight: 700;
                                        margin-bottom: 0.8vw;
                                    }
                                    .date {
                                        font-size: 3.5vw;
                                        color: #fff;
                                        margin-bottom: 0.5vw;
                                        &.on {
                                            color: var(--main-color);
                                            font-weight: 700;
                                        }
                                    }
                                    .desc {
                                        font-size: 3vw;
                                        color: #e8e8e8;
                                    }
                                }
                            }
                            @media screen and (min-width: 500px) {
                                .coupon {
                                    .text {
                                        font-size: 24px;
                                    }
                                    .content {
                                        top: 18px;
                                        left: 30px;
                                        .name {
                                            font-size: 28px;
                                            margin-bottom: 4px;
                                        }
                                        .date {
                                            font-size: 16px;
                                            margin-bottom: 3px;
                                        }
                                        .desc {
                                            font-size: 14px;
                                        }
                                    }
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
    const time = new Date().toString().split(' GMT')[0];

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/coupon/usableList`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data,
            time
        }
    };
};
