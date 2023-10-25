import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { Pagination } from 'swiper';
import Link from 'next/link';
import CustomImage from '@components/CustomImage';
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay]);

interface slides {
    idx: number;
    title: string;
    target_url: string;
    width: number;
    height: number;
    image: string;
}

interface slides {
    idx: number;
    title: string;
    target_url: string;
    width: number;
    height: number;
    image: string;
}

export default function ImageSlide({ slides }) {
    const loop = slides.length > 1;

    return (
        <>
            <Swiper pagination={loop} modules={[Pagination]} loop={loop} autoplay={loop}>
                {slides.map((list: slides, idx: number) => (
                    <SwiperSlide key={idx}>
                        <Link href={list.target_url === '' ? '/' : list.target_url} passHref>
                            <CustomImage src={list.image} alt={list.title} width={600} height={400} priority={idx === 0} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
