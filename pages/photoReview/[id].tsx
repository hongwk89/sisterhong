import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import scrollCheck from 'utils/scrollCheck';
import sendAxios from 'utils/sendAxios';

interface photoReview {
    idx: number;
    images: { image: string; width: number; height: number }[];
}

export default function PhotoReview({ data, product_id, limit }) {
    const ulRef = useRef<HTMLUListElement>();
    const [lists, setLists] = useState(data.data?.list);
    const [num, setNum] = useState(1);
    const totalPage = data.data?.pagination?.totalPages;

    useEffect(() => {
        if (ulRef.current.lastChild) {
            const intersectionObserver = scrollCheck(ulRef.current.lastChild as HTMLLIElement, () => setNum((prev) => prev + 1));

            return () => intersectionObserver.disconnect();
        }
    }, [lists]);

    useEffect(() => {
        if (num !== 1 && num <= totalPage) {
            const getData = async () => {
                const config = {
                    method: 'get',
                    url: `${process.env.API_HOST}/product/photo-reviews`,
                    params: { product_id, limit, page: num }
                };

                const success = (res) => {
                    setLists((prev) => [...prev, ...res.list]);
                };

                await sendAxios({ config, resFunc: success, errFunc: (err) => console.log(err.message) });
            };
            getData();
        }
    }, [num]);

    return (
        <>
            <PageTitle title="홍언니고기 - 포토리뷰" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <h1>
                            <Link legacyBehavior href={`/products/detailPage/${product_id}?tabNum=1`}>
                                <a className="backBtn">
                                    <span className="hidden">뒤로가기</span>
                                </a>
                            </Link>
                            포토리뷰 전체보기
                        </h1>
                        <div className="listWrap">
                            <ul ref={ulRef}>
                                {lists.map((list: photoReview, idx: number) => (
                                    <li key={idx}>
                                        <Link legacyBehavior href={`/photoReview/photoReviewDetail/?product_id=${product_id}&idx=${list.idx}`}>
                                            <a>
                                                <CustomImage src={list.images[0].image} alt="리뷰" fill objFit="cover" width={300} height={300} />
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <style jsx>{`
                            @use 'styles/mixins';
                            h1 {
                                position: relative;
                                padding: 4rem 0;
                                text-align: center;
                                font-size: 2.2rem;
                                font-weight: 700;
                                .backBtn {
                                    display: block;
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    transform: translateY(-50%);
                                    width: 3.5rem;
                                    height: 3.5rem;
                                    @include mixins.arrow(1.3rem, 0.2rem, 45deg, left, #191919);
                                }
                            }
                            .listWrap {
                                $wd: 31%;
                                $mg: calc((100% - $wd * 3) / 3);
                                padding: 0 calc(var(--side-padding) - $mg) 5rem var(--side-padding);
                                ul {
                                    transition: 2s;
                                    li {
                                        display: inline-block;
                                        width: $wd;
                                        position: relative;
                                        padding-top: $wd;
                                        margin: 0 $mg $mg 0;
                                        transition: all 0.5s;
                                        a {
                                            display: block;
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                }
                            }
                            @media only screen and (min-width: 480px) {
                                .listWrap {
                                    $wd: 23%;
                                    $mg: calc((100% - $wd * 4) / 4);
                                    padding: 0 calc(var(--side-padding) - $mg) 5rem var(--side-padding);
                                    ul {
                                        li {
                                            width: $wd;
                                            padding-top: $wd;
                                            margin: 0 $mg $mg 0;
                                        }
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

export const getServerSideProps = async (context) => {
    const product_id = context.params.id;
    const limit = 50;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/photo-reviews`,
        params: { product_id, limit }
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
            product_id,
            limit
        }
    };
};
