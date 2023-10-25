import usePopToggle from '@hooks/usePopToggle';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import checkToggle from 'utils/checkToggle';
import convertPrice from 'utils/convertPrice';
import CartListOne from './CartListOne';
import ChangePop from './ChangePop';

interface optionData {
    sold_out: string;
    disabled: boolean;
    inventory: number;
    amount: number;
}

export interface CartData {
    idx: number;
    product_idx: number;
    product_name: string;
    image: string;
    options: { option: optionData[] };
    amount: number;
    disabled: boolean;
    original_price: number;
    price: number;
    discount: number;
    soldOut: string;
}

export default function CartList({ cartList, setCartList }) {
    const agreeAll = useRef<HTMLInputElement>(null);
    const checkArea = useRef<HTMLInputElement>(null);
    const { popOpen, popClose } = usePopToggle();
    const [popIdx, setPopIdx] = useState(null);
    const [idx, setIdx] = useState<number[]>();
    const [prices, setPrices] = useState({ original: 0, discount: 0, total: 0 });
    const router = useRouter();

    const calcCartPrice = (array: number[], type: string) => {
        const checkedList = cartList.filter((list: CartData) => array.includes(list.idx));

        return checkedList.reduce((tot: number, list: CartData) => tot + list[type], 0);
    };

    const handleCheck = (e?: ChangeEvent<HTMLInputElement>): void => {
        if (e) {
            checkToggle(checkArea.current, agreeAll.current, e.target);
        }

        const inputs = checkArea.current.querySelectorAll('input[type=checkbox]:not(#agreeAll):checked') as NodeList;
        const array = [];

        Array.from(inputs).map((val: HTMLElement) => {
            array.push(parseInt(val.dataset.idx));
        });

        setPrices({ original: calcCartPrice(array, 'original_price'), discount: calcCartPrice(array, 'discount'), total: calcCartPrice(array, 'price') });
        setIdx(array);
    };

    const handleOrder = () => {
        if (idx.length === 0) {
            alert('주문할 상품을 선택해 주세요');
            return;
        }

        try {
            cartList
                .filter((list: CartData) => idx.includes(list.idx))
                .map((list: CartData) => {
                    if (list.options.option.some((data: optionData) => data.disabled) || list.options.option.some((data: optionData) => data.sold_out === 'Y') || list.options.option.some((data: optionData) => data.inventory < data.amount)) {
                        console.log(list);
                        throw `구매불가한 상품이 있습니다. (${list.product_name})`;
                    }
                });
        } catch (err) {
            alert(err);
            return;
        }

        const newArr = [];

        idx.map((val, index) => {
            const key = 'cart_idx[' + index + ']';

            newArr.push(key + '=' + val);
        });

        router.push({ pathname: '/order', query: newArr.join('&') });
    };

    useEffect(() => {
        handleCheck();
    }, [cartList]);

    return (
        <>
            <div className="checkArea" ref={checkArea}>
                <div className="check">
                    <div className="checkWrap">
                        <input type="checkbox" name="agreeAll" id="agreeAll" onChange={handleCheck} ref={agreeAll} defaultChecked />
                        <label htmlFor="agreeAll">전체선택</label>
                    </div>
                </div>

                <ul>
                    {cartList.map((cartData: CartData) => (
                        <CartListOne key={cartData.idx} data={cartData} setCartList={setCartList} handleCheck={handleCheck} popOpen={popOpen} setPopIdx={setPopIdx} />
                    ))}
                </ul>
            </div>
            <div className="totalArea">
                <div className="calcPrice">
                    <div>
                        <span>선택상품금액</span>
                        <span>{convertPrice(prices.original)}원</span>
                        <span>상품할인금액</span>
                        <span>{convertPrice(prices.discount)}원</span>
                    </div>
                </div>
                <div className="total">
                    <span>결제예정금액</span>
                    <span>{convertPrice(prices.total)}원</span>
                </div>
                <div className="btnArea">
                    {/* <button type="button" className="commonButton typeWhite">
                        선물하기
                    </button> */}
                    <button type="button" className="commonButton typeRed" onClick={handleOrder}>
                        주문하기
                    </button>
                </div>
            </div>
            <ChangePop popIdx={popIdx} popClose={popClose} cartData={cartList.filter((list: CartData) => list.idx === popIdx)[0]} setCartList={setCartList} setPopIdx={setPopIdx} />
            <style jsx>{`
                .checkArea {
                    .check {
                        padding: 1rem var(--side-padding);
                        label {
                            font-weight: 500;
                            font-size: 2rem;
                        }
                    }
                }
                .totalArea {
                    padding: 2rem var(--side-padding);
                    .calcPrice {
                        padding: 1rem 1.5rem;
                        border-bottom: 0.1rem solid #a2a2a2;
                        div {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            row-gap: 1.2rem;
                            font-size: 1.8rem;
                            span:nth-child(2n) {
                                text-align: right;
                            }
                        }
                        p {
                            font-size: 1.4rem;
                            text-align: right;
                            color: #707070;
                            span {
                                color: #cd2322;
                                vertical-align: baseline;
                            }
                        }
                    }
                    .total {
                        display: flex;
                        justify-content: space-between;
                        padding: 1rem 1.5rem;
                        span {
                            font-size: 2rem;
                            &:last-child {
                                font-weight: 700;
                            }
                        }
                    }
                    .btnArea {
                        padding: 1rem 1.5rem;
                        display: flex;
                        justify-content: space-around;
                        gap: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
