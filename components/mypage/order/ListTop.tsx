import Link from 'next/link';

export const deliveryStatus = ['배송중', '배송준비', '배송완료'];

export default function ListTop({ data, pacelPop }) {
    const status = data.status === '배송준비' ? '출고완료' : data.status;

    return (
        <>
            <div className="top">
                <div className="order">
                    <div>
                        <p>{data.created_at.split(' ')[0]}</p>
                        <p>{data.order_id}</p>
                    </div>
                    <Link legacyBehavior href={`/mypage/orderDetail/${data.order_id}`}>
                        <a>
                            주문상세보기 <span className="arrow"></span>
                        </a>
                    </Link>
                </div>
                <div className="delivery">
                    <span>
                        {status}
                        {data.state !== 600 && data.shipping_hope !== 'F' && <span className="reason">(희망발송일 : {data.shipping_at.split(' ')[0]})</span>}
                        {data.state === 600 && data.cancel_reason !== '' && <span className="reason">(사유 : {data.cancel_reason})</span>}
                    </span>
                    {deliveryStatus.includes(data.status) && (
                        <button type="button" className="commonButton typeWhite" onClick={() => pacelPop(data.order_id)}>
                            배송조회
                        </button>
                    )}
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .top {
                    padding: 1.2rem var(--side-padding-inner);
                    background: linear-gradient(to right, #f8f8fa, transparent);
                    .order {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                            font-family: 'roboto';
                            &:first-child {
                                color: #000;
                                font-size: 1.8rem;
                                font-weight: 500;
                            }
                            &:last-child {
                                font-size: 1.4rem;
                                color: #767676;
                            }
                        }
                        a {
                            display: flex;
                            align-items: center;
                            font-size: 1.6rem;
                            font-weight: 500;
                            .arrow {
                                display: block;
                                position: relative;
                                width: 2rem;
                                height: 2rem;
                                @include mixins.arrow(0.8rem, 0.1rem, 45deg, right);
                            }
                        }
                    }
                    .delivery {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 1rem;
                        h2 {
                            height: 4.5rem;
                            line-height: 4.5rem;

                            font-size: 1.8rem;
                            font-weight: 500;
                            background: linear-gradient(to right, #f8f8fa, transparent);
                        }
                        span {
                            display: block;
                            line-height: 3rem;
                            font-size: 1.4rem;
                            font-weight: 500;
                            &.reason {
                                display: inline-block;
                                color: var(--main-color);
                                margin-left: 0.5rem;
                                vertical-align: baseline;
                                font-size: 1.2rem;
                            }
                        }
                        button {
                            border-radius: 0;
                            font-size: 1.4rem;
                            font-weight: 500;
                            width: 7rem;
                            height: 3rem;
                            padding: 0;
                        }
                    }
                }
            `}</style>
        </>
    );
}
