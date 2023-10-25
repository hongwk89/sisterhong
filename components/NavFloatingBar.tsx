import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Menu from './menu/Menu';
import useBotNavHeight from '@hooks/store/useBotNavHeight';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import scrollLock from 'utils/scrollLock';
import useMenuToggle from '@hooks/store/useMenuToggle';
import useCartAmount from '@hooks/store/useCartAmount';
import useGetPath from '@hooks/useGetPath';
import initMenu from 'utils/initMenu';
import CustomImage from './CustomImage';
import cartAmountAxios from 'utils/cartAmountAxios';
import Search from './search/Search';
import useWindowSize from '@hooks/useWindowSize';

export default function NavFloatingBar() {
    const url = useGetPath();
    const navBar = useRef<HTMLDivElement>();
    const { token } = useTokenStore();
    const { menuToggle, searchToggle } = useMenuToggle();
    const { amount } = useCartAmount();
    const { width, height } = useWindowSize();

    const checkLink = (e: React.TouchEvent | React.MouseEvent) => {
        const href = (e.currentTarget as HTMLAnchorElement).href;

        if (href.includes(url)) {
            initMenu();
        }
    };

    const menuBtn = () => {
        useMenuToggle.setState({ menuToggle: !menuToggle, searchToggle: false });
    };

    const searchBtn = () => {
        useMenuToggle.setState({ menuToggle: false, searchToggle: !searchToggle });
    };

    useEffect(() => {
        useBotNavHeight.setState({ botNavHeight: navBar.current.offsetHeight });
    }, [width, height]);

    useEffect(() => {
        if (token) {
            cartAmountAxios();
        }
    }, [token]);

    useEffect(() => {
        if (menuToggle || searchToggle) {
            scrollLock(true);
        } else {
            scrollLock(false);
        }
    }, [menuToggle, searchToggle]);

    return (
        <>
            <div id="navBar" ref={navBar}>
                <ul>
                    <li className={`${menuToggle ? 'active' : ''}`} onClick={menuBtn}>
                        <div>
                            <span className="image hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                    </li>
                    <li className={`${searchToggle ? 'active' : ''}`} onClick={searchBtn}>
                        <div>
                            <span className="image search">
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                    </li>
                    <li className={`${url.includes('/cart') && !menuToggle && !searchToggle ? 'active' : ''}`}>
                        <Link legacyBehavior href="/cart">
                            <a onClick={checkLink}>
                                <span className="cart">
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/navBar/cart_${url.includes('/cart') && !menuToggle && !searchToggle ? 'on' : 'off'}.png`} alt="장바구니" width={62} height={62} />
                                    </span>
                                    {token && <span className="amount">{amount}</span>}
                                </span>
                            </a>
                        </Link>
                    </li>
                    {!token ? (
                        <li>
                            <span className="beforeLogin">Join / Log-in</span>
                            <Link legacyBehavior href="/login">
                                <a onClick={checkLink}>
                                    <span className="image">
                                        <CustomImage
                                            src={`${process.env.AWS_IMAGE_URL}/images/navBar/user_${['/login', '/join'].some((el) => url.includes(el)) && !menuToggle && !searchToggle ? 'on' : 'off'}.png`}
                                            alt="로그인, 회원가입"
                                            width={60}
                                            height={62}
                                        />
                                    </span>
                                </a>
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link legacyBehavior href="/mypage">
                                <a onClick={checkLink}>
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/navBar/user_${url.includes('/mypage') && !menuToggle && !searchToggle ? 'on' : 'off'}.png`} alt="마이페이지" width={60} height={62} />
                                    </span>
                                </a>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            <div className={`nav_menu ${menuToggle ? 'active' : ''}`}>
                <Menu />
            </div>
            <div className={`nav_menu ${searchToggle ? 'active' : ''}`}>
                <Search />
            </div>

            <style jsx>{`
                $transitionTime: 0.2s;
                $cubic-bezier1: cubic-bezier(0.85, 0.15, 1, 1);
                $cubic-bezier2: cubic-bezier(0.15, 0.85, 1, 1);
                $transitionTime2: calc($transitionTime * 2);
                #navBar {
                    display: block;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    padding: 2rem 0;
                    box-shadow: 0 0 0.2rem 0.2rem rgba(0, 0, 0, 0.05);
                    z-index: 100;
                    background: #fff;
                    ul {
                        display: flex;
                        justify-content: space-around;
                        padding: 0 3%;
                        li {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 20%;
                            position: relative;
                            a,
                            div {
                                display: block;
                                text-align: center;
                                cursor: pointer;
                                span {
                                    display: block;
                                    &.cart {
                                        position: relative;
                                        .amount {
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translate(10%, -100%);
                                            background: #a2a2a2;
                                            border-radius: 50%;
                                            width: 2.5rem;
                                            height: 2.5rem;
                                            line-height: 2.5rem;
                                            font-size: 1.4rem;
                                            color: #fff;
                                            font-family: 'roboto';
                                            font-weight: 700;
                                            @at-root li.active .amount {
                                                background: var(--main-color) !important;
                                            }
                                        }
                                    }
                                    &.image {
                                        position: relative;
                                        width: 3rem;
                                        height: 3rem;
                                        &.hamburger {
                                            span {
                                                display: block;
                                                width: 100%;
                                                height: 0.4rem;
                                                background: #a2a2a2;
                                                opacity: 1;
                                                z-index: 0;
                                                transform-origin: center;
                                                -webkit-transform-origin: center;
                                                position: absolute;
                                                top: 50%;
                                                left: 0;
                                                transform: translateY(-50%) rotate(0);
                                                -webkit-transform: translateY(-50%) rotate(0);
                                                border-radius: 0.2rem;
                                                transition: transform $transitionTime $cubic-bezier1, top $transitionTime $transitionTime $cubic-bezier2, opacity $transitionTime $transitionTime linear, background calc($transitionTime * 2);
                                                &:first-child {
                                                    top: calc(50% - 1.1rem);
                                                }
                                                &:last-child {
                                                    top: calc(50% + 1.1rem);
                                                }
                                                @at-root li.active .hamburger span {
                                                    background: var(--main-color) !important;
                                                    transition: top $transitionTime $cubic-bezier1, opacity $transitionTime linear, transform $transitionTime $transitionTime $cubic-bezier2 !important;
                                                    &:first-child {
                                                        top: 50% !important;
                                                        transform: translateY(-50%) rotate(45deg) !important;
                                                    }
                                                    &:nth-child(2) {
                                                        opacity: 0 !important;
                                                    }
                                                    &:last-child {
                                                        top: 50% !important;
                                                        transform: translateY(-50%) rotate(-45deg) !important;
                                                    }
                                                }
                                            }
                                        }
                                        &.search {
                                            span {
                                                display: block;
                                                position: absolute;
                                                transition: $transitionTime2;
                                                &:first-child {
                                                    top: 0;
                                                    left: 0;
                                                    width: 2.3rem;
                                                    height: 2.3rem;
                                                    border-radius: 50%;
                                                    border: 0.3rem solid #a2a2a2;
                                                    background: #fff;
                                                }
                                                &:last-child {
                                                    top: 1.7rem;
                                                    left: 1.9rem;
                                                    width: 1.3rem;
                                                    height: 0.3rem;
                                                    transform-origin: left;
                                                    transform: rotate(45deg);
                                                    background: #a2a2a2;
                                                }
                                                @at-root li.active .search span {
                                                    width: 3rem !important;
                                                    height: 0.4rem !important;
                                                    transform-origin: center !important;
                                                    transform: rotate(45deg) !important;
                                                    background: var(--main-color) !important;
                                                    border-radius: 0.2rem !important;
                                                    &:first-child {
                                                        top: 1.3rem !important;
                                                        left: 0 !important;
                                                        border: 0.2rem solid var(--main-color) !important;
                                                        transform: rotate(-45deg) !important;
                                                    }
                                                    &:last-child {
                                                        transform-origin: center !important;
                                                        top: 1.3rem !important;
                                                        left: 0 !important;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            .beforeLogin {
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                padding: 0.4rem 0;
                                text-align: center;
                                background: #fff;
                                color: var(--main-color);
                                font-weight: 700;
                                font-size: 1rem;
                                font-family: 'roboto';
                                width: 6.5rem;
                                border-radius: 50px;
                                border: 1px solid var(--main-color);
                                transform: translate(-50%, -4.5rem);
                                z-index: 10;
                                &:before {
                                    content: '';
                                    display: block;
                                    width: 0.5rem;
                                    height: 0.5rem;
                                    background: #fff;
                                    border: 1px solid var(--main-color);
                                    position: absolute;
                                    top: 100%;
                                    left: 50%;
                                    clip-path: polygon(0 0, 0 100%, 100% 0);
                                    transform: translate(-50%, -50%) rotate(225deg);
                                }
                            }
                        }
                    }
                }
                .nav_menu {
                    position: fixed;
                    top: 100%;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    height: 100%;
                    background: #fff;
                    z-index: 50;
                    transition: top 0.5s;
                    border: 1px solid #eee;
                    &.active {
                        top: 0;
                        transition: top 0.5s;
                    }
                }
            `}</style>
        </>
    );
}
