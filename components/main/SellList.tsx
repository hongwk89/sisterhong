import ProductList from '@components/product/ProductList';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface pList {
    brand: [];
    category: [];
    discount_ratio: number;
    discount_type: number;
    img: string;
    img_height: number;
    img_width: number;
    min_price: number;
    name: string;
    price: number;
    product_id: string;
    product_idx: number;
    promotion_end_date: string;
    promotion_start_date: string;
    promotion_state: string;
    sauce: string;
    slogan: string;
    type: string;
}

export default function SellList({ children, lists, listWidth }) {
    const type = listWidth >= 2.5 ? 'defaultPage smallBanner' : 'defaultPage';

    return (
        <>
            <h2>{children}</h2>
            <Swiper slidesPerView={listWidth} spaceBetween={10}>
                {lists.map((list: pList, idx: number) => (
                    <SwiperSlide key={idx}>
                        <ProductList list={list} type={type} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
