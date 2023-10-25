import CheckData from '@components/CheckData';
import Pager from '@components/Pager';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import sendAxios from 'utils/sendAxios';
import PRList from './PRList';
import PRPhotoList from './PRPhotoList';
import PRRating from './PRRating';

interface reviewList {
    best_review: number;
    user_id: string;
    score: number;
    hashtag: [];
    created_at: string;
    content: string;
    option_name: string;
    images: [];
}

export default function ProductReview({ product_id, setRvNum, tab }) {
    const [datas, setDatas] = useState({ state: null, pagination: null, data: null, summary: null, curPage: null, loadedPages: null });

    useEffect(() => {
        const reviewCount = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/product/reviews`,
                params: {
                    type: 'product',
                    product_id,
                    limit: 10,
                    page: 1
                }
            };
            const success = (res) => {
                setDatas({ state: 'success', pagination: res.pagination, summary: res.summary, data: [res.list], curPage: 1, loadedPages: [1] });
                setRvNum(res.summary.total);
            };
            const fail = (err) => {
                setDatas((prev) => ({ ...prev, state: 'fail', data: err }));
            };
            await sendAxios({ config, resFunc: success, errFunc: fail });
        };
        reviewCount();
    }, []);

    return (
        <>
            {datas.state && (
                <CheckData data={datas}>
                    {datas.state === 'success' &&
                        (datas.data.length === 0 ? (
                            <p className="error_msg">아직 리뷰가 없습니다.</p>
                        ) : (
                            <>
                                <div className="rating">
                                    <PRRating data={datas.summary} />
                                </div>
                                <div className="photoList">
                                    <h3>
                                        포토리뷰
                                        <Link legacyBehavior href={`/photoReview/${product_id}`}>
                                            <a>
                                                전체보기 <span className="arrow"></span>
                                            </a>
                                        </Link>
                                    </h3>
                                    <PRPhotoList product_id={product_id} />
                                </div>
                                <div className="reviewList">
                                    <ul>
                                        {datas.data[datas.curPage - 1].map((list: reviewList, idx: number) => (
                                            <PRList key={idx} data={list} tab={tab} />
                                        ))}
                                    </ul>
                                    <Pager product_id={product_id} datas={datas} setDatas={setDatas} type="review" />
                                </div>
                                <style jsx>{`
                                    @use 'styles/mixins';
                                    .noreview {
                                        padding: 3rem 0;
                                        font-size: 1.4rem;
                                        text-align: center;
                                    }
                                    .rating {
                                        padding: 4.5rem var(--side-padding);
                                    }
                                    .photoList {
                                        h3 {
                                            display: flex;
                                            justify-content: space-between;
                                            color: #000;
                                            font-size: 1.8rem;
                                            font-weight: 500;
                                            padding: 0 var(--side-padding);
                                            a {
                                                display: flex;
                                                align-items: center;
                                                font-size: 1.4rem;
                                                color: #707070;
                                                font-weight: 500;
                                                .arrow {
                                                    display: inline-block;
                                                    position: relative;
                                                    width: 2rem;
                                                    height: 2rem;
                                                    @include mixins.arrow(0.7rem, 0.1rem, 45deg, right, #707070);
                                                }
                                            }
                                        }
                                    }
                                    .reviewList {
                                        padding: 2rem var(--side-padding) 4rem;
                                    }
                                `}</style>
                            </>
                        ))}
                </CheckData>
            )}
        </>
    );
}
