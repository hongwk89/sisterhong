import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import PageTitle from '@components/PageTitle';
import ProductList from '@components/product/ProductList';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

interface productList {
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
}

export default function Wishlist({ data }) {
    const [datas, setDatas] = useState(data.data);

    const deleteWish = async (product_id: string) => {
        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/wish/delete`,
            data: { product_id }
        };
        const success = () => {
            setDatas((prev) => prev.filter((list) => list.product_id !== product_id));
        };
        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 위시리스트" />
            <MypageTitle back={true}>위시리스트</MypageTitle>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        {datas.length !== 0 ? (
                            <>
                                <div className="list">
                                    <ul>
                                        {datas.map((list: productList, idx: number) => (
                                            <ProductList key={idx} list={list} type="defaultPage wishList" deleteWish={deleteWish} />
                                        ))}
                                    </ul>
                                </div>
                                <style jsx>{`
                                    .list {
                                        padding: 2rem var(--side-padding-inner);
                                        ul {
                                            display: grid;
                                            grid-template-columns: 1fr 1fr;
                                            column-gap: 1.6rem;
                                            row-gap: 3rem;
                                            li:last-child {
                                                margin-right: 0;
                                            }
                                        }
                                    }
                                `}</style>
                            </>
                        ) : (
                            <>
                                <p>위시리스트가 없습니다.</p>
                                <style jsx>{`
                                    p {
                                        color: #a2a2a2;
                                        font-size: 1.6rem;
                                        padding-bottom: 5rem;
                                        text-align: center;
                                    }
                                `}</style>
                            </>
                        )}
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/wish/list`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
