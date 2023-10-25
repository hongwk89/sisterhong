import Filter from '@components/product/Filter';
import ProductList from '@components/product/ProductList';
import CustomImage from '@components/CustomImage';
import sendAxios from 'utils/sendAxios';
import { useEffect, useRef, useState } from 'react';
import PageTitle from '@components/PageTitle';
import { NAVIGATION } from '@components/Layout/Nav';
import CheckData from '@components/CheckData';
import sortData from 'utils/sortData';

interface kind {
    product_idx: number;
    product_id: string;
    price: number;
    min_price: number;
    name: string;
    slogan: string;
    sauce: string;
    type: 'N';
    discount_type: number;
    discount_ratio: number;
    brand: [];
    img: string;
    img_width: number;
    img_height: number;
    category: [];
}

const FILTERLIST = [
    { name: '추천순', val: 'sort' },
    { name: '낮은가격순', val: 'min' },
    { name: '높은가격순', val: 'max' },
    { name: '판매순', val: 'sales' },
    { name: '상품후기순', val: 'reviews' }
];

export default function Products({ data, id }) {
    const [datum, setDatum] = useState(data.data.list);
    const ulRef = useRef<HTMLUListElement>();
    const [filter, setFilter] = useState('sort');

    const arrangeList = () => {
        if (filter === 'sort') {
            setDatum(data.data.list);
            return;
        }

        setDatum((prev) => sortData(prev, filter));
    };

    useEffect(() => {
        setDatum(data.data.list);
        setFilter('sort');
    }, [data.data.list]);

    useEffect(() => {
        arrangeList();
    }, [filter]);

    return (
        <>
            <PageTitle title={`홍언니고기 - ${NAVIGATION[id]}`} />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div>
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/productKind/${id}.png`} alt="상품배너" width={720} height={240} />
                            <h1 className="hidden">{NAVIGATION[id]}</h1>
                        </div>
                        <Filter FILTERLIST={FILTERLIST} filter={filter} setFilter={setFilter} />
                        <div className="list">
                            <ul ref={ulRef}>
                                {datum.map((list: kind, idx: number) => (
                                    <ProductList key={idx} list={list} type="defaultPage smallBanner" />
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
                )}
            </CheckData>
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const limit = 100;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/category/${id}`,
        params: { limit }
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
            id,
            limit
        }
    };
}
