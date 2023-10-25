import endDate from 'utils/endDate';

interface coupon {
    idx: number;
    coupon_name: string;
    description: string;
    usable_end_date: string;
    selected: 'Y' | 'N';
    disabled: 'Y' | 'N';
}

export default function CouponPop({ lists, time, selectedNum, setSelectedNum }) {
    return (
        <>
            <ul className="coupon lists">
                <li>
                    <label className="radioCheckLabel">
                        <input type="radio" name="coupon" defaultChecked={lists.length === 0} onChange={() => setSelectedNum((prev) => ({ prev: prev.current, current: -1 }))} />
                        <div>
                            <p>적용안함</p>
                        </div>
                    </label>
                </li>
                {lists.map((list: coupon, idx: number) => {
                    const { leftTime, end_date } = endDate(list, time);

                    return (
                        <li key={idx}>
                            <label className="radioCheckLabel">
                                <input type="radio" name="coupon" checked={selectedNum.current === list.idx} disabled={list.disabled === 'Y'} onChange={() => setSelectedNum((prev) => ({ prev: prev.current, current: list.idx }))} />
                                <div>
                                    <p>{list.coupon_name}</p>
                                    <p>{list.description}</p>
                                    <p className={`${leftTime <= 48 ? 'on' : ''}`}>사용기한 : {end_date}까지</p>
                                </div>
                            </label>
                        </li>
                    );
                })}
            </ul>
            <style jsx>{`
                .coupon {
                    label {
                        cursor: pointer;
                        align-items: normal;
                        input {
                            margin-top: 0.1rem;
                        }
                        div {
                            p {
                                &:nth-child(2) {
                                    line-height: 1.6;
                                    font-size: 1.2rem;
                                }
                                &:nth-child(3) {
                                    line-height: 1.6;
                                    font-size: 1.2rem;
                                    color: #707070;
                                    &.on {
                                        color: var(--main-color);
                                    }
                                }
                                &.on {
                                    color: var(--main-color);
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
