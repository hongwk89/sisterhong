import CheckData from '@components/CheckData';
import PageTitle from '@components/PageTitle';
import ProductList from '@components/product/ProductList';
import sendAxios from 'utils/sendAxios';
import Link from 'next/link';

interface saleList {
    product_idx: number;
    product_id: string;
    name: string;
    slogan: string;
    sauce: string;
    min_price: number;
    price: number;
    brand: string[];
    free_shipping_price: number;
    shipping_fee: number;
    information: string;
    description: string;
    discount_type: number;
    discount_ratio: number;
    promotion_start_date: string;
    promotion_end_date: string;
    img: string;
    sales: number;
    reviews: number;
    img_width: number;
    img_height: number;
    category: string[];
}

export default function Sale({ data, timer }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 지금할인" />
            {data.data.list.length === 0 ? (
                <>
                    <div className="wrap">
                        <p>
                            죄송합니다.
                            <br />
                            현재 할인하는 상품이 없습니다.
                        </p>
                        <div className="btn">
                            <Link href="/" legacyBehavior>
                                <a className="commonButton typeRed">홈으로</a>
                            </Link>
                        </div>
                    </div>
                    <style jsx>{`
                        .wrap {
                            text-align: center;
                            padding: 4rem var(--side-padding);
                            p {
                                white-space: pre-wrap;
                                font-size: 1.6rem;
                                font-weight: 500;
                                margin-bottom: 2rem;
                            }
                            .btn {
                                display: block;
                                margin: 0 auto;
                                width: 8rem;
                                height: 3.5rem;
                                .commonButton {
                                    padding: 0;
                                    height: 100%;
                                    text-align: center;
                                    font-size: 1.4rem;
                                }
                            }
                        }
                    `}</style>
                </>
            ) : (
                <CheckData data={data}>
                    {data.state === 'success' && (
                        <>
                            <div className="list">
                                <ul>
                                    {data.data.list.map((list: saleList, idx: number) => (
                                        <ProductList key={idx} list={list} timer={timer} type="salePage" />
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </CheckData>
            )}
        </>
    );
}

export const getServerSideProps = async (context) => {
    const timer = new Date().toString().split(' GMT')[0];

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/promotion`
    };
    const data = await sendAxios({ config, context });

    if (data.state === 'fail') {
        return {
            redirect: {
                permanent: false,
                destination: `/error/?msg=${encodeURIComponent(data.data.message)}`
            }
        };
    }

    return {
        props: {
            data,
            timer
        }
    };
};
