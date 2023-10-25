import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface img {
    image: string;
    width: number;
    height: number;
}
interface photoReview {
    idx: number;
    images: img[];
}

export default function PRPhotoList({ product_id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const reviewCount = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/product/photo-reviews`,
                params: {
                    type: 'product',
                    product_id,
                    limit: 10,
                    page: 1
                }
            };

            const result = await sendAxios({ config });

            setData(result);
        };
        reviewCount();
    }, []);

    return (
        <>
            {data && (
                <CheckData data={data}>
                    {data.state === 'success' && (
                        <>
                            <div id="review_slide" className="wrap">
                                <Swiper slidesPerView={'auto'} spaceBetween={8}>
                                    {data.data.list.map((list: photoReview, idx: number) => {
                                        if (idx < 10) {
                                            return (
                                                <SwiperSlide key={idx}>
                                                    <Link legacyBehavior href={`/photoReview/photoReviewDetail?product_id=${product_id}&idx=${list.idx}`}>
                                                        <a>
                                                            <CustomImage src={list.images[0].image} alt="리뷰" fill objFit="cover" />
                                                        </a>
                                                    </Link>
                                                </SwiperSlide>
                                            );
                                        }
                                    })}
                                    <SwiperSlide>
                                        <Link legacyBehavior href={`/photoReview/${product_id}`}>
                                            <a className="last">더보기+</a>
                                        </Link>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <style jsx global>{`
                                #review_slide {
                                    .swiper-slide {
                                        width: auto;
                                    }
                                }
                            `}</style>
                            <style jsx>{`
                                .wrap {
                                    padding: 0 var(--side-padding);
                                    margin-top: 0.8rem;
                                    a {
                                        position: relative;
                                        display: flex;
                                        align-items: center;
                                        width: 25vw;
                                        height: 25vw;
                                        max-width: 11rem;
                                        max-height: 11rem;
                                        &.last {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            background: rgba(0, 0, 0, 0.7);
                                            font-size: 1.6rem;
                                            color: #fff;
                                        }
                                    }
                                }
                            `}</style>
                        </>
                    )}
                </CheckData>
            )}
        </>
    );
}
