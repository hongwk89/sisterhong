import CartList from '@components/cart/CartList';
import EmptyCart from '@components/cart/EmptyCart';
import CheckData from '@components/CheckData';
import PageTitle from '@components/PageTitle';
import useNaverCB from '@hooks/store/useNaverCB';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export interface cartList {
    idx: number;
    product_idx: number;
    product_id: string;
    product_name: string;
    image: string;
    price: number;
    brand: [];
    changed: boolean;
    options: {};
}

export default function Cart({ data }) {
    const [cartList, setCartList] = useState(data.data.products);

    useEffect(() => {
        // 카카오
        kakaoPixel(process.env.KAKAO_PIXEL).viewCart();

        //네이버
        if (window.wcs) useNaverCB.setState({ _nasa: { cnv: wcs.cnv('3', '0') } });
        useNaverCB.setState({ check: true });
    }, []);

    return (
        <>
            <PageTitle title="홍언니고기 - 장바구니" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div>
                            <h1>장바구니</h1>
                            {cartList?.length !== 0 ? <CartList cartList={cartList} setCartList={setCartList} /> : <EmptyCart />}
                        </div>
                        <style jsx>{`
                            div {
                                h1 {
                                    font-size: 2.2rem;
                                    font-weight: 700;
                                    text-align: center;
                                    margin-bottom: 2.5rem;
                                }
                                padding: 3rem 0;
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/shopping-carts`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
