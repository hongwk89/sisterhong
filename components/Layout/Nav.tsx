import useGetPath from '@hooks/useGetPath';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';

export const NAVIGATION = {
    sale: '지금할인',
    all: '전체상품',
    beef: '소고기',
    lamb: '양고기',
    premium: '프리미엄',
    combo: '세트상품',
    gift: '선물세트'
};

export default function Nav() {
    const url = useGetPath();
    const swiperRef = useRef(null);
    const slideWrapWidth = useRef(0);
    const [firstRender, setFirstRender] = useState(false);

    const handleSlideClick = () => {
        if (firstRender) {
            setFirstRender(true);
            document.fonts.ready.then(function () {
                const swiperList = swiperRef.current.children[0].childNodes;
                let index = 0;

                for (let i = 0; i < swiperList.length; i++) {
                    if (swiperList[i].children[0].classList.contains('active')) {
                        index = i;
                    }
                }

                swiperRef.current.swiper.slideTo(index, 300, true);
                const slideWidth = (document.querySelector('#main_content') as HTMLDivElement).offsetWidth;
                const slideEl = swiperRef.current.swiper.slides[index];
                const slideWidthToSlideEl = slideEl.offsetLeft + slideEl.offsetWidth / 2;
                const centerPosition = slideWidth / 2 - slideWidthToSlideEl;
                let move = centerPosition;

                if (centerPosition > 0) {
                    move = 0;
                }

                if (slideWrapWidth.current - slideWidth / 2 <= slideEl.offsetLeft) {
                    move = -(slideWrapWidth.current - slideWidth);
                }

                swiperRef.current.swiper.setTranslate(move);
            });
        }
    };

    useEffect(() => {
        handleSlideClick();
    }, [url]);

    useEffect(() => {
        document.fonts.ready.then(function () {
            slideWrapWidth.current = Array.from(swiperRef.current.children[0].childNodes).reduce((tot: number, cur: HTMLDivElement) => {
                return tot + cur.offsetWidth + parseInt(window.getComputedStyle(cur).marginLeft) * 2;
            }, 0) as number;
        });
    }, []);

    return (
        <>
            <nav id="main_nav">
                <div className="wrap">
                    <Swiper slidesPerView={'auto'} freeMode={true} ref={swiperRef} modules={[FreeMode]}>
                        {Object.keys(NAVIGATION).map((key, idx) => {
                            if (key === 'sale') {
                                return (
                                    <SwiperSlide key={idx}>
                                        <div className={`${url === '/' + key ? 'active' : ''}`}>
                                            <Link legacyBehavior href={`/${key}`}>
                                                <a>{NAVIGATION[key]}</a>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                );
                            }

                            return (
                                <SwiperSlide key={idx}>
                                    <div className={`${url === '/products/' + key ? 'active' : ''}`}>
                                        <Link legacyBehavior href={`/products/${key}`}>
                                            <a>{NAVIGATION[key]}</a>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </nav>
            <style jsx global>{`
                #main_nav {
                    .swiper-wrapper {
                        .swiper-slide {
                            margin: 0 1.5rem;
                            width: auto;
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                #main_nav {
                    position: relative;
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 3rem;
                        height: 100%;
                        background: linear-gradient(to left, #fff, transparent);
                        z-index: 10;
                    }
                    box-shadow: 0 0.4rem 0.4rem -0.2rem rgba(0, 0, 0, 0.05);
                    background: #fff;
                    .wrap {
                        div {
                            a {
                                font-size: 1.6rem;
                                font-weight: 500;
                                color: #000;
                                display: block;
                                padding: 0.8rem 0;
                                text-align: center;
                            }
                            &.active {
                                a {
                                    color: var(--main-color);
                                    font-weight: 700;
                                    border-bottom: 0.2rem solid var(--main-color);
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
