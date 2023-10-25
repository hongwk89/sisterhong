import convertPrice from 'utils/convertPrice';

export default function LastPrice({ params }) {
    const original_total = convertPrice(params.payment.original_totals);
    const shipping_fee = params.payment.shipping_fee !== 0 ? '+ ' + convertPrice(params.payment.shipping_fee) : 0;
    const promotion = params.discount.promotion !== 0 ? '- ' + convertPrice(params.discount.promotion) : 0;
    const coupon = params.discount.coupon !== 0 ? '- ' + convertPrice(params.discount.coupon) : 0;
    const point_use = params.discount.point_use !== 0 ? '- ' + convertPrice(params.discount.point_use) : 0;

    return (
        <>
            <div className="wrap">
                <div className="list">
                    <span className="key">상품가격</span>
                    <span className="val">{original_total}원</span>
                    <span className="key">
                        <span className="delivery">
                            배송비
                            <span className="notice">
                                <span className="icon">?</span>
                                <span className="text">
                                    최종결제금액 기준 5만원이상 무료배송
                                    <br /> (도서산간 배송비 추가 4,500원)
                                </span>
                            </span>
                        </span>
                    </span>
                    <span className="val">{shipping_fee}원</span>
                    <span className="key">상품할인</span>
                    <span className="val">{promotion}원</span>
                    <span className="key">쿠폰사용</span>
                    <span className="val">{coupon}원</span>
                    <span className="key">적립금사용</span>
                    <span className="val">{point_use}원</span>
                </div>
                <div className="result">
                    <span>최종결제금액</span>
                    <div>
                        <span>{convertPrice(params.payment.price_to_pay)}원</span>
                        <span>
                            적립예정금액 : <span>{convertPrice(params.reward.order_points)}원</span>
                        </span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .list {
                    display: grid;
                    grid-template-columns: 7rem 1fr;
                    row-gap: 1.2rem;
                    padding-bottom: 1.2rem;
                    border-bottom: 1px solid #e8e8e8;
                    .key {
                        font-size: 1.4rem;
                        color: #767676;
                        .delivery {
                            position: relative;
                            color: #767676;
                            .notice {
                                position: absolute;
                                bottom: 70%;
                                left: 100%;
                                .icon {
                                    cursor: pointer;
                                    position: relative;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 1.3rem;
                                    height: 1.3rem;
                                    font-size: 1rem;
                                    border-radius: 50%;
                                    background: #a2a2a2;
                                    color: #fff;
                                    font-weight: 700;
                                    z-index: 5;
                                    &:hover + .text {
                                        display: block;
                                    }
                                }
                                .text {
                                    display: none;
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    width: 17rem;
                                    padding: 0.7rem 0;
                                    font-weight: 500;
                                    font-size: 1rem;
                                    text-align: center;
                                    background: #f8f8fa;
                                }
                            }
                        }
                    }
                    .val {
                        font-size: 1.6rem;
                        text-align: right;
                    }
                }
                .result {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 1.2rem;
                    > span {
                        display: block;
                        font-size: 2rem;
                        font-weight: 500;
                        color: var(--main-color);
                    }
                    > div {
                        text-align: right;
                        > span {
                            display: block;
                            &:first-child {
                                font-size: 2rem;
                                font-weight: 700;
                            }
                            &:last-child {
                                margin-top: 0.3rem;
                                position: relative;
                                font-size: 1.4rem;
                                color: #a2a2a2;
                                .icon {
                                    position: absolute;
                                    top: -0.7rem;
                                    left: -1.7rem;
                                    z-index: 10;
                                    span {
                                        display: block;
                                        width: 1.5rem;
                                        height: 1.5rem;
                                        color: #fff;
                                        background: #a2a2a2;
                                        border-radius: 50%;
                                        text-align: center;
                                        font-size: 1rem;
                                    }
                                    ul {
                                        display: none;
                                        justify-items: center;
                                        flex-wrap: wrap;
                                        position: absolute;
                                        top: 1rem;
                                        left: 1rem;
                                        z-index: -1;
                                        background: #f8f8fa;
                                        padding: 1rem 1.5rem;
                                        text-align: left;
                                        li {
                                            font-size: 1rem;
                                            margin-bottom: 0.5rem;
                                            white-space: nowrap;
                                            &:last-child {
                                                margin-bottom: 0;
                                            }
                                            &.red {
                                                color: var(--main-color);
                                            }
                                        }
                                    }
                                    &.on {
                                        display: block;
                                        > span {
                                            background: var(--main-color);
                                        }
                                        > ul {
                                            display: flex;
                                        }
                                    }
                                }
                                > span {
                                    vertical-align: top;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
