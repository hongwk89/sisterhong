import Brands from '@components/Brands';
import ReviewButton from '@components/mypage/order/ReviewButton';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import convertPrice from 'utils/convertPrice';
import CartListOneTop from './CartListOneTop';

export interface cartOption {
    group: string;
    amount: number;
    sold_out: string;
    disabled: boolean;
    inventory: number;
}

export interface review_pop_option {
    amount: number;
    group: string;
    ordered_options_idx: number;
    review_state: number;
}

export default function CartListOne({ type = 'cart', data, setCartList = null, handleCheck = null, popOpen = null, setPopIdx = null, popData = null }) {
    let soldOut = false;

    data.options.option.map((list: cartOption) => {
        if (list.sold_out === 'Y') {
            soldOut = true;
        }
    });

    return (
        <>
            <li className={`check cartPage ${type}`}>
                {type === 'cart' ? (
                    <CartListOneTop data={data} setCartList={setCartList} handleCheck={handleCheck} popOpen={popOpen} setPopIdx={setPopIdx} />
                ) : (
                    <>
                        <Brands data={data.brand} />
                        <h3 className="title">{data.name}</h3>
                    </>
                )}

                <div className="cartDetail">
                    <div>
                        <Link legacyBehavior href={`/products/detailPage/${data.product_id}`}>
                            <a className={data.reward === 1 || data.product_state === 0 ? 'disabled' : ''}>
                                {type !== 'cart' ? (
                                    <span className="image">
                                        <CustomImage src={data.image.path} alt={data.name} width={200} height={200} />
                                    </span>
                                ) : (
                                    <span className="image">
                                        <CustomImage src={data.image} alt={data.product_name} width={200} height={200} />
                                    </span>
                                )}
                            </a>
                        </Link>
                    </div>
                    <div className="option">
                        <div>
                            <span>상품옵션 : </span>
                            <div>
                                {data.options.option.map((list: cartOption, idx: number) => {
                                    if (list.disabled) {
                                        return (
                                            <div className="unable" key={idx}>
                                                <span>{list.group}</span>
                                                <span>구매불가</span>
                                            </div>
                                        );
                                    }
                                    if (list.sold_out === 'Y') {
                                        return (
                                            <div className="unable" key={idx}>
                                                <span>{list.group}</span>
                                                <span>품절</span>
                                            </div>
                                        );
                                    }
                                    if (list.inventory < list.amount) {
                                        return (
                                            <div className="unable" key={idx}>
                                                <span>{list.group}</span>
                                                <span className="amount">{list.amount}</span>
                                                <span>남은수량 {list.inventory}</span>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="sell" key={idx}>
                                            <span>{list.group}</span>
                                            <span className="amount">{list.amount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {data.options.sauce.length > 0 && (
                            <div>
                                <span>추가선택 : </span>
                                <div>
                                    {data.options.sauce.map((list: cartOption, idx: number) => {
                                        if (list.disabled) {
                                            return (
                                                <div className="unable" key={idx}>
                                                    <span>{list.group}</span>
                                                    <span>구매불가</span>
                                                </div>
                                            );
                                        }
                                        if (list.sold_out === 'Y') {
                                            return (
                                                <div className="unable" key={idx}>
                                                    <span>{list.group}</span>
                                                    <span>품절</span>
                                                </div>
                                            );
                                        }
                                        if (list.inventory < list.amount) {
                                            return (
                                                <div className="unable" key={idx}>
                                                    <span>{list.group}</span>
                                                    <span className="amount">{list.amount}</span>
                                                    <span>남은수량 {list.inventory}</span>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div className="sell" key={idx}>
                                                <span>{list.group}</span>
                                                <span className="amount">{list.amount}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* {type === 'cart' && soldOut && (
                    <button type="button" className="notice">
                        <span className="image">
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/cart/speaker.png`} width={36} height={36} alt="스피커" />
                        </span>
                        재입고알림
                    </button>
                )} */}
                {type !== 'mypage' && !soldOut && <div className="price">{<span>{convertPrice(data.price)}원</span>}</div>}
                {type === 'mypage' && popData.order_status === '배송완료' && <ReviewButton data={data.options.option} popData={popData} />}
            </li>
            <style jsx>{`
                li {
                    &.cart {
                        padding: 2rem var(--side-padding);
                        box-shadow: 0 0.3rem 0.8rem 0 rgba(0, 0, 0, 0.05);
                        margin-bottom: 1.5rem;
                    }
                    .title {
                        font-size: 1.8rem;
                        font-weight: 500;
                        line-height: 1.2;
                        margin-bottom: 0.8rem;
                    }
                    &.mypage {
                        padding: 2rem 0;
                        border-bottom: 0.1rem solid #e8e8e8;
                        &:last-child {
                            border-bottom: 0;
                        }
                    }
                    .cartDetail {
                        margin-top: 1rem;
                        display: flex;
                        .image {
                            display: block;
                            flex-shrink: 0;
                            width: 6rem;
                            height: 6rem;
                        }
                        .disabled {
                            pointer-events: none;
                        }
                        .option {
                            > div {
                                display: flex;
                                padding: 0 0 0.6rem 1rem;
                                font-size: 1.4rem;
                                > span {
                                    min-width: 6rem;
                                }
                                > div {
                                    padding-left: 0.2rem;
                                    > div {
                                        span {
                                            vertical-align: baseline;
                                            &.amount {
                                                display: inline-block;
                                                background: #a2a2a2;
                                                color: #fff;
                                                padding: 0 0.9rem;
                                                font-size: 1.2rem;
                                                border-radius: 1rem;
                                                margin-left: 0.5rem;
                                            }
                                        }
                                        &.unable {
                                            span {
                                                &:first-child {
                                                    color: #a2a2a2;
                                                }
                                                &:last-child {
                                                    font-size: 1.2rem;
                                                    font-weight: 700;
                                                    margin-left: 0.5rem;
                                                    color: #e01922;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &.cart .cartDetail {
                        padding-left: 2.6rem;
                    }
                    .notice {
                        background: var(--main-color);
                        border-radius: 1rem;
                        padding: 0.5rem 1rem;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        font-size: 1.4rem;
                        margin-left: auto;
                        .image {
                            width: 1.8rem;
                            margin-right: 0.5rem;
                        }
                    }
                    .price {
                        text-align: right;
                        font-weight: 700;
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
}
