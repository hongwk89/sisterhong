import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import { ReviewStar } from '@components/product/detailPage/productInfo/ProductReview/ReviewStar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export interface reviewImg {
    img: string;
    img_width: number;
    img_height: number;
}

export interface reviewData {
    images: reviewImg[];
    contents: string;
    score: number;
    created_at: string;
    product_id: string;
    option_name: string;
    hashtag?: [];
    user_id?: string;
    img?: string;
    img_width?: number;
    img_height?: number;
}

export default function BestReview() {
    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/main/reviews`, params: { limit: 10 } };

            const result = await sendAxios({ config });

            setDatas(result);
        };

        getData();
    }, []);

    return (
        <>
            {datas && (
                <CheckData data={datas}>
                    {datas.state === 'success' && (
                        <ul>
                            {datas.data.list.map((review: reviewData, idx: number) => (
                                <li key={idx}>
                                    <Link legacyBehavior href={`/products/detailPage/${review.product_id}?tabNum=1`}>
                                        <a className="default">
                                            <div className="leftSide">
                                                <span className="image">
                                                    <CustomImage src={review.img} alt="리뷰" fill sizes="9rem" objFit="cover" />
                                                </span>
                                            </div>
                                            <div className="content">
                                                <div className="top">
                                                    <div className="icons">
                                                        <ReviewStar score={review.score} />
                                                    </div>
                                                    <p className="text">{review.contents.replace(/\<p\>|\<\/p\>/g, '')}</p>
                                                </div>
                                                <div className="info">
                                                    <span>{review.user_id}</span>
                                                    <span className="v_bar"></span>
                                                    <span>{review.created_at}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CheckData>
            )}
            <style jsx>{`
                ul {
                    height: 28rem;
                    overflow-y: scroll;
                    li {
                        background: #fff;
                        padding: 0.7rem;
                        height: 10.4rem;
                        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
                        margin-bottom: 0.7rem;

                        .default {
                            display: flex;
                            .leftSide {
                                flex-shrink: 0;
                                .image {
                                    background: #f8f8fa;
                                    position: relative;
                                    display: block;
                                    width: 9rem;
                                    height: 9rem;
                                }
                            }
                            .content {
                                display: flex;
                                width: calc(100% - 9rem);
                                flex-direction: column;
                                justify-content: space-between;
                                padding: 0 1rem;
                                .top {
                                    .icons {
                                        position: relative;
                                        display: flex;
                                        gap: 0.5rem;
                                        align-items: center;
                                    }
                                    .text {
                                        margin-top: 0.2rem;
                                        font-size: 1.2rem;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        word-wrap: break-word;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        max-height: 6rem;
                                    }
                                }
                                .info {
                                    display: flex;
                                    justify-content: right;
                                    align-items: center;
                                    gap: 0.5rem;
                                    margin-top: 0.3rem;
                                    span {
                                        display: block;
                                        font-size: 1rem;
                                        color: #707070;
                                        &.v_bar {
                                            width: 0.1rem;
                                            height: 0.5rem;
                                            background: #e8e8e8;
                                        }
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
