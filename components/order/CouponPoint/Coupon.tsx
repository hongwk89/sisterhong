import usePopToggle from '@hooks/usePopToggle';
import { useState } from 'react';
import convertPrice from 'utils/convertPrice';
import OrderListPop from '../popup/AddrList';

export interface couponInfo {
    idx: number;
    coupon_name: string;
    selected: string;
    coupon_discount: number;
}

export default function Coupon({ data, time, params, setParams }) {
    const [info, setInfo] = useState(data.filter((list: couponInfo) => list.selected === 'Y')[0]);
    const { popOn, popOpen, popClose } = usePopToggle();

    return (
        <>
            <div>
                <input type="text" className={`${info ? 'on' : ''}`} readOnly={true} value={info ? info.coupon_name : `보유한 쿠폰 ${data.length}장`} />
                <button type="button" className="commonButton typeRed" onClick={popOpen}>
                    쿠폰선택
                </button>
                {info && (
                    <p>
                        할인금액 : <span>{convertPrice(info ? info.coupon_discount : 0)}원</span>
                    </p>
                )}
            </div>
            <div className="pop_wrap">
                <OrderListPop type="coupon" popOn={popOn} popClose={popClose} data={data} time={time} params={params} setParams={setParams} setInfo={setInfo} />
            </div>

            <style jsx>{`
                div:not(.pop_wrap) {
                    display: flex;
                    flex-wrap: wrap;
                    column-gap: 1rem;
                    margin-bottom: 1.5rem;
                    input {
                        flex-basis: 0;
                        flex-grow: 1;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                        color: #a2a2a2;
                        &.on {
                            color: #000;
                            font-weight: 500;
                        }
                    }
                    button {
                        flex-basis: 8rem;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                    }
                    p {
                        flex-basis: 100%;
                        padding-left: 1rem;
                        color: #707070;
                        font-size: 1.4rem;
                        font-weight: 500;
                        margin-top: 0.5rem;
                        span {
                            font-weight: 700;
                            color: #000;
                            vertical-align: baseline;
                        }
                    }
                }
                .pop_wrap {
                    position: relative;
                    left: -3rem;
                }
            `}</style>
        </>
    );
}
