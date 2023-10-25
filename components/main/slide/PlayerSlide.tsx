import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import YoutubeComponent from './YoutubeComponent';

interface playerSlide {
    key: string;
    type: string;
    title: string;
    link: string;
    youtube_channel: string;
    subject: string;
    subject_image: string;
    sort: number;
}

export default function PlayerSlide({ slides }) {
    const [lazyLoad, setLazyLoad] = useState(false);
    const [slideChange, setSlideChange] = useState(0);

    const onSlideChange = (val) => {
        const { activeIndex } = val;

        setSlideChange(activeIndex);
    };

    useEffect(() => {
        const players = document.querySelectorAll('.youtubeIframe');

        Array.from(players).map((list) => {
            (list as HTMLIFrameElement).contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*');
        });
    }, [slideChange]);

    useEffect(() => {
        setLazyLoad(true);
    }, []);

    return (
        <>
            <div id="player_slide">
                <Swiper pagination={true} modules={[Pagination]} spaceBetween={20} loop={false} autoplay={false} onSlideChange={onSlideChange}>
                    {slides.map((list: playerSlide, idx: number) => {
                        return (
                            <SwiperSlide key={idx}>
                                <div className="swiper_wrap">
                                    <div className="player_top">{lazyLoad && <YoutubeComponent list={list} />}</div>
                                    <div className="player_bot">
                                        <div className="icon">
                                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/mainSlide/youtube.png`} alt="youtube" width={90} height={20} />
                                        </div>
                                        <div className="title">
                                            <p>{list.subject}</p>
                                            <Link legacyBehavior href={list.link}>
                                                <a>
                                                    바로가기 <span className="arrow"></span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <style jsx global>{`
                .gallery-thumbs {
                    height: 200px;
                    box-sizing: border-box;
                    padding: 10px 0;
                    overflow-y: hidden;
                    overflow-x: auto;
                }
            `}</style>
            <style jsx>{`
                @use 'styles/mixins';
                #player_slide {
                    .swiper_wrap {
                        padding: 0 1.5rem 1.5rem;
                        cursor: pointer;
                        .player_top {
                            position: relative;
                            width: 100%;
                            padding-top: 56.3%;
                            background: black;
                            overflow: hidden;
                        }
                        .player_bot {
                            padding: 1.5rem 0 1.5rem 1.5rem;
                            .icon {
                                width: 6rem;
                                margin-bottom: 0.5rem;
                            }
                            .title {
                                display: flex;
                                justify-content: space-between;
                                p {
                                    font-size: 1.6rem;
                                    color: #000;
                                    font-weight: 700;
                                }
                                a {
                                    display: flex;
                                    align-items: center;
                                    text-align: right;
                                    font-size: 1.4rem;
                                    color: #707070;
                                    .arrow {
                                        display: block;
                                        position: relative;
                                        width: 1.5rem;
                                        height: 1.5rem;
                                        @include mixins.arrow(0.8rem, 0.1rem, 45deg, right, #707070);
                                    }
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
