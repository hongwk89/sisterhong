import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import sendAxios from 'utils/sendAxios';
import convertPrice from '../../utils/convertPrice';
import toPhoneForm from 'utils/toPhoneForm';
import PageTitle from '@components/PageTitle';
import { useEffect } from 'react';
import cartAmountAxios from 'utils/cartAmountAxios';
import useNaverCB from '@hooks/store/useNaverCB';
import { event } from 'nextjs-google-analytics';

interface gaData {
    product_id: string;
    name: string;
    group: string;
    ordered_options_price: number;
    promotion_price: number;
    amount: number;
}

export default function Success({ data }) {
    const order = data.data.order;

    cartAmountAxios();

    useEffect(() => {
        if (order) {
            //애널리틱스

            // 구글
            event('purchase', {
                category: 'ecommerce',
                value: order.payment_amount,
                currency: 'KRW',
                transaction_id: order.order_id,
                items: data.data.orderedProducts.map((list: gaData) => ({
                    item_id: list.product_id,
                    item_name: list.name,
                    item_category: list.group,
                    price: list.promotion_price,
                    quantity: list.amount
                }))
            });

            // 카카오
            const total_quantity = data.data.orderedProducts.reduce((tot, cur) => (tot += cur.options.option.reduce((tot2, cur2) => (tot2 += cur2.amount), 0)), 0).toString();
            const products = data.data.orderedProducts.map((list) => ({
                id: list.product_id,
                name: list.name,
                quantity: list.options.option.reduce((tot, cur) => (tot += cur.amount), 0),
                price: list.options.option.reduce((tot, cur) => (tot += cur.promotion_price), 0)
            }));

            kakaoPixel(process.env.KAKAO_PIXEL).purchase({
                total_quantity, // 주문 내 상품 개수(optional)
                total_price: order.payment_amount, // 주문 총 가격(optional)
                currency: 'KRW', // 주문 가격의 화폐 단위(optional, 기본 값은 KRW)
                products
            });

            // 네이버
            if (window.wcs) useNaverCB.setState({ _nasa: { cnv: wcs.cnv('1', order.payment_amount) } });
            useNaverCB.setState({ check: true });
        }
    }, []);

    return (
        <>
            <PageTitle title="홍언니고기 - 주문완료" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="top">
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/bigCheck.png`} alt="" width={80} height={80} />
                            </span>
                            <h4>주문이 {order.payment_method !== '무통장입금' ? '완료' : '확인'}되었습니다.</h4>
                            <p>
                                고객님이 주문하신 상품의
                                <br /> 주문번호는 <span>{order.order_id}</span> 입니다.
                            </p>
                        </div>
                        <div className="history">
                            {['무통장입금', '가상계좌'].includes(order.payment_method) ? (
                                <>
                                    <span className="key">송금계좌</span>
                                    <div className="method">
                                        <span>
                                            {order.payment_method === '무통장입금' ? (
                                                <>
                                                    {process.env.SISTER_HONG_BANK_NAME} {process.env.SISTER_HONG_BANK}
                                                </>
                                            ) : (
                                                <>
                                                    {order.payment_info.bank.name} {order.payment_info.bank.accountNumber}
                                                </>
                                            )}
                                        </span>
                                        <br />
                                        <span>주식회사 홍언니고기 푸드</span>
                                        <br />
                                        {order.cash_receipt === 'NotNeeded' ? <span>현금영수증 신청안함</span> : <span>현금영수증 신청</span>}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="key">결제수단</span>
                                    <div className="method">
                                        <span>{order.payment_method}</span>
                                    </div>
                                </>
                            )}
                            <span className="price_text key red">결제금액</span>
                            <span className="price red">{convertPrice(order.payment_amount)}원</span>
                        </div>
                        <div className="userInfo">
                            <h2>배송지정보</h2>
                            <div className="content">
                                <span>수령인</span>
                                <span>{order.receiver_name}</span>
                                <span>연락처</span>
                                <span>{toPhoneForm(order.receiver_phone)}</span>
                                <span>배송지</span>
                                <span>{order.receiver_address + ' ' + order.receiver_address_detail}</span>
                                <span>배송메모</span>
                                <span>{order.shipping_message}</span>
                                <span>요청사항</span>
                                <span>{order.requirement}</span>
                            </div>
                        </div>
                        <div className="btns">
                            <Link legacyBehavior href={`/mypage/orderDetail/${order.order_id}`}>
                                <a className="commonButton">주문상세보기</a>
                            </Link>
                            <Link legacyBehavior href="/">
                                <a className="commonButton typeRed">첫 화면으로</a>
                            </Link>
                        </div>
                        <style jsx>{`
                            .top {
                                padding: 3rem var(--side-padding);
                                text-align: center;
                                .image {
                                    display: inline-block;
                                    width: 4rem;
                                    margin-bottom: 1rem;
                                }
                                h4 {
                                    font-size: 1.8rem;
                                    font-weight: 500;
                                }
                                p {
                                    font-size: 1.4rem;
                                    span {
                                        color: var(--main-color);
                                        vertical-align: baseline;
                                    }
                                }
                            }
                            .transferNotice {
                                font-size: 1.4rem;
                                font-weight: 500;
                                color: #707070;
                                text-align: center;
                                margin-bottom: 0.8rem;
                                span {
                                    vertical-align: baseline;
                                    color: #000;
                                }
                            }
                            .history {
                                display: grid;
                                grid-template-columns: 8rem auto;
                                grid-template-rows: repeat(2, auto);
                                margin: 0 var(--side-padding);
                                border: 0.1rem solid #ddd;
                                > * {
                                    display: block;
                                    padding: 1.5rem;
                                }
                                .key {
                                    display: flex;
                                    align-items: center;
                                    height: 100%;
                                    background: #f8f8fa;
                                    color: #767676;
                                    font-size: 1.4rem;
                                    text-align: center;
                                }
                                .red {
                                    color: var(--main-color);
                                }
                                .method {
                                    span {
                                        &:nth-of-type(1) {
                                            font-size: 1.6rem;
                                            font-weight: 700;
                                        }
                                        &:nth-of-type(2) {
                                            font-size: 1.2rem;
                                        }
                                        &:nth-of-type(3) {
                                            color: #a2a2a2;
                                        }
                                    }
                                }
                                .price_text {
                                    font-weight: 500;
                                    border-top: 0.1rem solid #ddd;
                                }
                                .price {
                                    font-size: 1.6rem;
                                    font-weight: 700;
                                    border-top: 0.1rem solid #ddd;
                                }
                            }
                            .userInfo {
                                margin-top: 3.5rem;
                                box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.05);
                                h2 {
                                    height: 4.5rem;
                                    line-height: 4.5rem;
                                    padding: 0 var(--side-padding-inner);
                                    font-size: 1.8rem;
                                    font-weight: 500;
                                    background: linear-gradient(to right, #f8f8fa, transparent);
                                }
                                .content {
                                    padding: 1.5rem var(--side-padding-inner);
                                    display: grid;
                                    grid-template-columns: 6rem auto;
                                    gap: 1.5rem;
                                    span {
                                        color: #767676;
                                        font-size: 1.6rem;
                                        line-break: anywhere;
                                        &:nth-child(2n) {
                                            color: #191919;
                                        }
                                    }
                                }
                            }
                            .btns {
                                display: flex;
                                padding: 3.5rem var(--side-padding-inner);
                                gap: 1.5rem;
                                a {
                                    border-radius: 5rem;
                                    height: 4rem;
                                    font-size: 1.6rem;
                                    &:first-child {
                                        background: #fff;
                                        border: 0.1rem solid #191919;
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
    const params = context.query;
    const order_id = params.orderId;
    const payment_key = params.paymentKey || null;
    const amount = params.amount;
    const payment_type = params.payment_type;

    const config = {
        method: 'post',
        url: `${process.env.API_HOST}/orders/payment-approval`,
        data: {
            order_id,
            payment_key,
            amount,
            payment_type
        }
    };
    await sendAxios({ config, context, errFunc: (err) => console.log(err.message) });

    const config2 = {
        method: 'get',
        url: `${process.env.API_HOST}/orders/${order_id}`
    };
    const data = await sendAxios({ config: config2, context, errFunc: (err) => console.log(err.message) });

    return {
        props: {
            data
        }
    };
};
