import convertPrice from 'utils/convertPrice';

interface optionDetail {
    name: string;
    sort: number;
    amount: number;
    detail_idx: number;
}

export default function OptionBoxList({ opt, handleSelect }) {
    const promo = opt.promotion.length;
    const price = promo !== 0 ? opt.promotion[0].price : opt.price;

    return (
        <>
            <li className="optionList" onClick={(e) => handleSelect(e, opt)}>
                <h5>
                    <p>
                        <span className={`name ${opt.sold_out === 'Y' ? 'soldOut' : ''}`}>
                            {opt.group} {opt.sold_out === 'Y' && <span>품절</span>}
                        </span>
                    </p>
                    <div>
                        <span className={`price ${promo !== 0 ? 'promo' : ''} `}>{convertPrice(price)}원</span>
                        {opt.sold_out !== 'Y' && opt.inventory < 10 && <span className="inventory">남은수량 {opt.inventory}개</span>}
                    </div>
                </h5>
                {opt.option_detail && (
                    <ul>
                        {opt.option_detail.map((opt_dt: optionDetail, subIdx: number) => (
                            <li key={subIdx}>
                                {opt_dt.name} {opt_dt.amount}개
                            </li>
                        ))}
                    </ul>
                )}
            </li>
            <style jsx>{`
                $price_wd: 7.5rem;
                h5 {
                    display: flex;
                    justify-content: space-between;
                    align-items: top;
                    font-weight: normal;
                    p {
                        display: flex;
                        align-items: center;
                        .name {
                            font-size: 1.8rem;
                            color: #191919;
                            &.soldOut {
                                color: #a2a2a2;
                                > span {
                                    font-size: 1.2rem;
                                    font-weight: 700;
                                    color: #e01922;
                                }
                            }
                        }
                    }
                    > div {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .price {
                            display: block;
                            min-width: $price_wd;
                            font-weight: 700;
                            text-align: right;
                            &.promo {
                                color: var(--main-color);
                            }
                        }
                        .inventory {
                            font-size: 1.2rem;
                            font-weight: 500;
                            color: #e01922;
                            width: 8rem;
                            text-align: right;
                        }
                    }
                }
                ul {
                    margin-top: 0.6rem;
                    width: calc(100% - $price_wd);
                    li {
                        padding-left: 1rem;
                        font-size: 1.4rem;
                        color: #767676;
                        margin-bottom: 0.2rem;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            `}</style>
        </>
    );
}
