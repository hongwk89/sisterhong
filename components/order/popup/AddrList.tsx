import useBotNavHeight from '@hooks/store/useBotNavHeight';
import useRenewPayment from '@hooks/useRenewPayment';
import { useEffect, useRef, useState } from 'react';
import { couponInfo } from '../CouponPoint/Coupon';
import { shipInfo } from '../DestinationInfo';
import AddrAddBtn from './AddrAddBtn';
import AddrPop from './AddrPop';
import CouponPop from './CouponPop';

const option = { coupon: { title: '쿠폰선택', btn: '적용완료' }, destination: { title: '배송지 변경', btn: '선택완료' } };

export const addrData = { shipping: undefined, user_name: '', phone: '', zipcode: '', address: '', detailed_address: '', default_address: '' };

export default function OrderListPop({ type, popOn, popClose, data, params, setParams, setInfo = null, time = null }) {
    const [lists, setLists] = useState(data);
    const { loading, renewData } = useRenewPayment();
    const [selectedNum, setSelectedNum] = useState(() => {
        if (lists.length !== 0) {
            if (type === 'destination') {
                const shipping = lists.filter((li: shipInfo) => li.default_address === 'Y')[0]?.shipping;
                return { prev: shipping, current: shipping };
            } else if (type === 'coupon') {
                const idx = lists.filter((li: couponInfo) => li.selected === 'Y')[0]?.idx;
                return { prev: idx, current: idx };
            }
        }
        return { prev: null, current: null };
    });
    const [objH, setObjH] = useState({ h2: 0, btn: 0 });
    const [popOn2, setPopOn2] = useState({ on: '', data: addrData });
    const { botNavHeight } = useBotNavHeight();
    const h2Ref = useRef<HTMLHeadingElement>();
    const btnRef = useRef<HTMLDivElement>();

    const setup = async (type: String) => {
        if (!selectedNum.current) {
            let text = '';

            if (type === 'destination') {
                text = '배송지가';
            } else if (type === 'coupon') {
                text = '쿠폰이';
            }
            alert(`선택된 ${text} 없습니다.`);
            return;
        }

        if (type === 'destination') {
            const success = () => {
                setInfo(lists.filter((li: shipInfo) => li.shipping === selectedNum.current)[0]);
                popClose();
            };
            const fail = () => {
                setSelectedNum((prev) => ({ ...prev, current: prev.prev }));
            };

            await renewData({ params, setParams, data: { addr_idx: selectedNum.current }, success, fail });
        }

        if (type === 'coupon') {
            const success = () => {
                const selectedData = lists.filter((li: couponInfo) => li.idx === selectedNum.current);

                if (selectedData.length > 0) {
                    setInfo(lists.filter((li: couponInfo) => li.idx === selectedNum.current)[0]);
                } else {
                    setInfo(null);
                }

                popClose();
            };
            const fail = () => {
                setSelectedNum((prev) => ({ ...prev, current: prev.prev }));
            };

            await renewData({ params, setParams, data: { coupon_idx: selectedNum.current }, success, fail });
        }
    };

    useEffect(() => {
        setObjH({ h2: h2Ref.current.offsetHeight, btn: btnRef.current.offsetHeight });
    }, []);

    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className={`box content ${popOn}`}>
                    <h2 ref={h2Ref}>
                        {option[type].title}
                        {type === 'destination' && <AddrAddBtn setPopOn2={setPopOn2} />}
                    </h2>
                    {type === 'coupon' ? (
                        <CouponPop lists={lists} selectedNum={selectedNum} setSelectedNum={setSelectedNum} time={time} />
                    ) : (
                        <AddrPop lists={lists} setLists={setLists} selectedNum={selectedNum} setSelectedNum={setSelectedNum} popOn2={popOn2} setPopOn2={setPopOn2} />
                    )}
                    <div className="btns" ref={btnRef}>
                        <button type="button" className="commonButton typeWhite" onClick={popClose} disabled={loading}>
                            취소
                        </button>
                        <button type="button" className="commonButton typeRed" onClick={() => setup(type)} disabled={loading}>
                            {option[type].btn}
                        </button>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                $h2h: ${objH.h2}px;
                $btnH: ${objH.btn}px;
                .box .lists {
                    height: calc(100% - $h2h - $btnH);
                    overflow-y: auto;
                    > li {
                        border-bottom: 1px solid #e8e8e8;
                        padding: 1.5rem var(--side-padding-inner);
                        > label {
                            display: flex;
                            > div {
                                > p {
                                    &:first-child {
                                        display: flex;
                                        align-items: center;
                                        line-height: 2.4rem;
                                        font-size: 1.6rem;
                                        font-weight: 500;
                                    }
                                }
                            }
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                $botNavHeight: ${botNavHeight}px;
                .pop_bg {
                    .content {
                        &.on {
                            bottom: $botNavHeight;
                        }
                        position: absolute;
                        bottom: -100%;
                        left: 0;
                        width: 100%;
                        height: calc(100% - $botNavHeight);
                        transition: bottom 0.5s;
                        background: #fff;
                        h2 {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        .btns {
                            display: flex;
                            gap: 1rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
