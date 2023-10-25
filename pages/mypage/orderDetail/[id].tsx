import MypageTitle from '@components/mypage/MypageTitle';
import MypagePaymentMethod from '@components/mypage/orderDetail/MypagePaymentMethod';
import Tracking from '@components/mypage/orderDetail/Tracking';
import OrdererInfo from '@components/order/OrdererInfo';
import PaymentInfo from '@components/mypage/orderDetail/PaymentInfo';
import MypageOrderList from '@components/mypage/order/MypageOrderList';
import sendAxios from 'utils/sendAxios';
import CheckData from '@components/CheckData';
import { useState } from 'react';
import PageTitle from '@components/PageTitle';

export default function OrderDetail({ data, user }) {
    const [tracking, setTracking] = useState(data.data.order.status);
    const productData = [{ status: data.data.order?.status, order: data.data.order, products: data.data.orderedProducts, reason: data.data.cancelReason }];
    return (
        <>
            <PageTitle title="홍언니고기 - 주문상세내역" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <MypageTitle back={true} url="/mypage/order">
                            주문상세내역
                        </MypageTitle>
                        <div className="wrap">
                            <Tracking data={tracking} />
                            <div className="topInfo">
                                <p>
                                    <span>주문일자</span>
                                    <span>{data.data.order.created_at}</span>
                                </p>
                                <p>
                                    <span>주문번호</span>
                                    <span>{data.data.order.order_id}</span>
                                </p>
                            </div>
                        </div>
                        <div className="box">
                            <h2>주문자정보</h2>
                            <CheckData data={user}>
                                <OrdererInfo data={user.data} />
                            </CheckData>
                        </div>
                        <div className="box">
                            <h2>배송지정보</h2>
                            <OrdererInfo type="dest" data={data.data.order} />
                        </div>
                        <div className="box">
                            {/* 주문상품 */}
                            <MypageOrderList data={productData} type="detail" setTracking={setTracking} />
                        </div>
                        <div className="box">
                            <h2>결제정보</h2>
                            <PaymentInfo data={data.data.orderExtra} payment={parseInt(data.data.order.payment_amount)} status={data.data.order.origin_status}/>
                        </div>
                        <div className="box">
                            <h2>결제수단</h2>
                            <MypagePaymentMethod data={data.data.order} />
                        </div>
                        <style jsx>{`
                            .wrap {
                                padding: 0 var(--side-padding);
                                .topInfo {
                                    padding: 3rem 0;
                                    p {
                                        display: flex;
                                        align-items: center;
                                        &:first-child {
                                            margin-bottom: 1.1rem;
                                        }
                                        span {
                                            display: block;
                                            &:nth-child(1) {
                                                position: relative;
                                                font-size: 1.6rem;
                                                color: #767676;
                                                padding-right: 0.7rem;
                                                margin-right: 0.7rem;
                                                &:after {
                                                    content: '';
                                                    position: absolute;
                                                    top: 50%;
                                                    right: 0;
                                                    transform: translateY(-50%);
                                                    display: block;
                                                    width: 0.1rem;
                                                    height: 1rem;
                                                    background: var(--main-color);
                                                }
                                            }
                                            &:nth-child(2) {
                                                font-family: 'roboto';
                                                font-size: 1.8rem;
                                                color: #000;
                                                font-weight: 500;
                                            }
                                        }
                                    }
                                }
                            }
                            .box {
                                box-shadow: 0 0.3rem 0.3rem 0 rgb(0 0 0 / 5%);
                                margin-bottom: 3.5rem;
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const id = context.params.id;

    const config1 = {
        method: 'get',
        url: `${process.env.API_HOST}/orders/${id}`
    };
    const data = await sendAxios({ config: config1, context });

    if (data.state === 'fail') {
        return {
            redirect: {
                permanent: false,
                destination: `/error/?msg=${encodeURIComponent(data.data.message)}`
            }
        };
    }

    const config2 = {
        method: 'get',
        url: `${process.env.API_HOST}/auth/user-info`
    };
    const user = await sendAxios({ config: config2, context });

    return {
        props: {
            data,
            user
        }
    };
};
