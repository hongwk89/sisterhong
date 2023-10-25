import useBotNavHeight from '@hooks/store/useBotNavHeight';
import usePopToggle from '@hooks/usePopToggle';
import { useEffect, useRef, useState } from 'react';
import convertPrice from 'utils/convertPrice';
import { useRouter } from 'next/router';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import useBtnHeight from '@hooks/store/useBtnHeight';
import sendAxios from 'utils/sendAxios';
import cartAmountAxios from 'utils/cartAmountAxios';
import OptionBox from './productInfo/OptionBox';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';

interface cartData {
    images: [];
    options: {
        amount: number;
    }[];
    product: {};
    sauces: [];
}

export default function PurchaseBtn({ data }) {
    const { popOn, popOpen, popClose } = usePopToggle();
    const { botNavHeight } = useBotNavHeight();
    const [prices, setPrices] = useState([0, 0]);
    const [total, setTotal] = useState(0);
    const [cartData, setCartData] = useState<cartData>();
    const [loading, setLoading] = useState(false);
    const { token } = useTokenStore();
    const popCont = useRef();
    const router = useRouter();
    const btn = useRef<HTMLDivElement>();
    const cartPop = useRef<HTMLDivElement>();

    const bgClickClosePop = (e: React.TouchEvent | React.MouseEvent) => {
        const { target, currentTarget } = e;

        if (target === currentTarget) {
            popClose();
        }
    };

    const updatePrice = (idx: number, num: number) => {
        const getPrice = [...prices];
        getPrice[idx] = num;
        setPrices(getPrice);
    };

    const sendData = async (type: string, func: Function) => {
        setLoading(true);

        if (!token) {
            if (confirm('로그인이 필요합니다. 로그인페이지로 이동하시겠습니까?')) {
                router.push({ pathname: '/login', query: { returnUrl: router.asPath } });
            } else {
                setLoading(false);
            }
            return;
        }

        const amount = cartData.options.reduce((tot, cur) => (tot += cur.amount), 0);

        if (amount > data.product.limitation) {
            alert('구매할수 있는 수량을 넘었습니다. 수량을 확인해주세요.');
            return;
        }

        if (cartData.options.length !== 0) {
            const params = { product_idx: data.product.product_idx, type: type, options: cartData.options.concat(cartData.sauces) };
            const config = { method: 'post', url: `${process.env.API_HOST}/shopping-carts`, data: { data: JSON.stringify(params) } };

            const success = (res) => {
                kakaoPixel(process.env.KAKAO_PIXEL).addToCart({
                    id: data.product.product_id
                });

                if (type === 'informal') {
                    func(res.cart_idx);
                    return;
                }
                func();
            };
            await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        } else {
            alert('상품구성을 선택해주세요');
        }

        setLoading(false);
    };

    const submitCart = async () => {
        sendData('formal', async () => {
            openPop();
            cartAmountAxios();
            popClose();
        });
    };

    const submitOrder = async () => {
        sendData('informal', (idx: number) => {
            router.push({ pathname: '/order', query: `cart_idx[0]=${idx}` });
        });
    };

    const openPop = () => {
        cartPop.current.style.display = 'block';
    };

    const closePop = () => {
        cartPop.current.style.display = 'none';
    };

    useEffect(() => {
        useBtnHeight.setState({ btnHeight: btn.current.offsetHeight });
    }, []);

    useEffect(() => {
        setTotal(prices.reduce((prev, cur) => prev + cur, 0));
    }, [prices]);

    return (
        <>
            <div className="menuBtn buyButton" ref={btn}>
                {data.product.state === 4 && (
                    <button type="button" className="commonButton typeGrey" disabled={true}>
                        상품 준비중입니다
                    </button>
                )}
                {data.product.state === 2 && (
                    <button type="button" className="commonButton typeGrey" disabled={true}>
                        품절
                    </button>
                )}
                {[1, 5].includes(data.product.state) && (
                    <button type="button" className="commonButton typeRed" onClick={popOpen}>
                        구매하기
                    </button>
                )}
            </div>
            <div className={`pop_bg ${popOn}`} onClick={bgClickClosePop}>
                <div className="purchasePop">
                    <div className="closeBtn" onClick={popClose}>
                        <span>
                            <span className="hidden">닫기</span>
                        </span>
                    </div>
                    <div className="content" ref={popCont}>
                        <div className="options">
                            <OptionBox type="options" option={data.options} text={'상품구성 (필수)'} updatePrice={updatePrice} idx={0} setCartData={setCartData} />
                            <OptionBox type="sauces" option={data.sauces} text={'추가상품 (선택)'} updatePrice={updatePrice} idx={1} setCartData={setCartData} />
                            <p className="finalPrice">
                                합계 : <span>{convertPrice(total)}원</span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="button" className="commonButton typeWhite" onClick={submitCart} disabled={loading}>
                            장바구니
                        </button>
                        <button type="button" className="commonButton typeRed" onClick={submitOrder} disabled={loading}>
                            바로구매
                        </button>
                    </div>
                </div>
            </div>
            <div id="cartPop" ref={cartPop}>
                <div className="top">
                    <span className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/filledCart.png`} width={40} height={40} alt="" />
                    </span>
                    <p>선택하신 상품을 장바구니에 담았습니다.</p>
                </div>
                <div className="bot">
                    <button type="button" onClick={closePop}>
                        계속쇼핑
                    </button>
                    <Link href="/cart" legacyBehavior>
                        <a>장바구니</a>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                $botNavHeight: ${botNavHeight}px;
                .buyButton {
                    position: fixed;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    bottom: $botNavHeight;
                    z-index: 30;
                    button {
                        font-size: 2rem;
                        border-radius: 0;
                    }
                }
                .pop_bg {
                    &.on {
                        .purchasePop {
                            bottom: $botNavHeight;
                        }
                    }
                    .purchasePop {
                        position: absolute;
                        bottom: -100%;
                        width: 100%;
                        z-index: 50;
                        transition: bottom 0.3s;
                        .closeBtn {
                            background: #fff;
                            height: 3rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 1.5rem 1.5rem 0 0;
                            cursor: pointer;
                            > span {
                                position: relative;
                                display: block;
                                width: 5rem;
                                height: 2.5rem;
                                @include mixins.arrow(1.5rem, 0.2rem, 60deg, down, #a2a2a2);
                            }
                        }
                        .content {
                            background: #fff;
                            max-height: 70vh;
                            overflow-y: auto;
                            .options {
                                padding: 1.5rem var(--side-padding) 1.5rem;
                                .finalPrice {
                                    color: #707070;
                                    font-size: 2.4rem;
                                    text-align: right;
                                    font-weight: 500;
                                    span {
                                        color: #191919;
                                        font-weight: 700;
                                        vertical-align: baseline;
                                    }
                                }
                            }
                        }
                        .buttons {
                            display: flex;
                            justify-content: space-between;
                            button {
                                width: 50%;
                                border-radius: 0;
                            }
                        }
                    }
                }
                #cartPop {
                    z-index: 50;
                    display: none;
                    position: fixed;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #fff;
                    width: 30rem;
                    text-align: center;
                    border: 1px solid #aaa;
                    border-radius: 1rem;
                    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
                    margin-left: 10vw;
                    .top {
                        padding: 3.5rem 0;
                        .image {
                            display: inline-block;
                            width: 2rem;
                        }
                        p {
                            font-size: 1.4rem;
                            margin-top: 0.5rem;
                        }
                    }
                    .bot {
                        display: flex;
                        border-top: 1px solid #aaa;
                        > * {
                            width: 50%;
                            display: block;
                            padding: 1.3rem 0;
                            font-size: 1.2rem;
                            &:first-child {
                                border-right: 1px solid #aaa;
                            }
                        }
                    }
                }
                @media only screen and (min-width: 500px) {
                    #cartPop {
                        margin-left: 4rem;
                    }
                }
            `}</style>
        </>
    );
}
