import { ReviewStar } from '@components/product/detailPage/productInfo/ProductReview/ReviewStar';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { reviewImg } from '@components/main/BestReview';

export default function ReviewList({ data, tab }) {
    const [togBtn, setTogBtn] = useState(false);
    const [on, setOn] = useState(false);
    const text = useRef<HTMLParagraphElement>();
    const wrap = useRef<HTMLLIElement>();
    const imgExist = data.images.length > 0;

    const toggle = useCallback(() => {
        const oneLine_h = Math.round(parseFloat(window.getComputedStyle(text.current).getPropertyValue('line-height').replace('px', '')));
        const lines = text.current.scrollHeight / oneLine_h;

        if (lines > 2) {
            setTogBtn(true);
        }
    }, []);

    useEffect(() => {
        if (tab === 1) {
            toggle();
        }
    }, [tab]);

    const handleToggle = () => {
        setOn((prev) => !prev);
    };

    return (
        <>
            <li className={`wrap ${on ? 'on' : ''}`} ref={wrap}>
                <div className="default">
                    <div className="leftSide">
                        <span className="image">
                            <CustomImage src={data.product_image.img} alt="리뷰" width={data.product_image.img_width} height={data.product_image.img_height} />
                        </span>
                        <Link legacyBehavior href={`/products/detailPage/${data.product_id}`}>
                            <a className={`${data.product_state === 0 ? 'unable' : ''}`}>상품바로가기</a>
                        </Link>
                    </div>
                    <div className="content">
                        <div className="top">
                            <div className="icons">
                                <ReviewStar score={data.score} />
                                {imgExist && (
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/review_img.png`} alt="" width={36} height={36} />
                                    </span>
                                )}
                                {(togBtn || imgExist) && (
                                    <button type="button" className="arrow" onClick={handleToggle}>
                                        <span className="hidden">리뷰 토글 버튼</span>
                                    </button>
                                )}
                            </div>
                            <ul className="hashtag">
                                {data.hashtag.map((list: string, idx: number) => (
                                    <li key={idx}>{list}</li>
                                ))}
                            </ul>
                            <p className="text" ref={text}>
                                {data.contents.replace(/\<p\>|\<\/p\>/gi, '')}
                            </p>
                        </div>
                        <div className="info">
                            <span className="option">[ {data.option_name} ]</span>
                            <span className="v_bar"></span>
                            <span>{data.created_at}</span>
                        </div>
                    </div>
                </div>
                <ul className="pictures">
                    {data.images.map((list: reviewImg, idx: number) => (
                        <li key={idx}>
                            <CustomImage src={list.img} alt="리뷰" width={list.img_width} height={list.img_height} />
                        </li>
                    ))}
                </ul>
            </li>

            <style jsx>{`
                @use 'styles/mixins';
                $ht: 7rem;
                $pd: 0.7rem;
                .wrap {
                    background: #fff;
                    padding: $pd;
                    height: 11.1rem;
                    overflow: hidden;
                    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
                    margin-bottom: $pd;
                    .default {
                        display: flex;
                        gap: $pd;
                        .leftSide {
                            flex-shrink: 0;
                            .image {
                                background: #f8f8fa;
                                position: relative;
                                display: block;
                                flex-shrink: 0;
                                width: $ht;
                                height: $ht;
                            }
                            > a {
                                display: block;
                                width: $ht;
                                height: 2.2rem;
                                line-height: 2.2rem;
                                text-align: center;
                                color: #fff;
                                margin-top: 0.5rem;
                                background: var(--main-color);
                                &.unable {
                                    background: #a2a2a2;
                                    color: #e8e8e8;
                                    pointer-events: none;
                                }
                            }
                        }
                        .content {
                            display: flex;
                            width: calc(100% - $ht);
                            flex-direction: column;
                            justify-content: space-between;
                            .top {
                                .icons {
                                    position: relative;
                                    display: flex;
                                    gap: 0.5rem;
                                    align-items: center;
                                    .image {
                                        display: block;
                                        width: 1.2rem;
                                        line-height: 1;
                                    }
                                    .arrow {
                                        position: absolute;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        right: 0;
                                        width: 2rem;
                                        height: 2rem;
                                        @include mixins.arrow(1rem, 0.1rem, 45deg, down);
                                        margin-left: auto;
                                    }
                                }
                                .hashtag {
                                    margin: 0.5rem 0;
                                    display: flex;
                                    gap: 0.5rem;
                                    li {
                                        background: #f3f3f3;
                                        padding: 0.3rem 0.6rem;
                                        border-radius: 0.5rem;
                                        font-weight: 500;
                                        letter-spacing: 0;
                                    }
                                }
                                .text {
                                    margin-top: 0.2rem;
                                    font-size: 1.2rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    word-wrap: break-word;
                                    white-space: pre-wrap;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    max-height: calc(1.2rem * 1.4 * 2);
                                    @at-root .bestReview .content .text {
                                        -webkit-line-clamp: 3 !important;
                                        max-height: calc(1.2rem * 1.4 * 3) !important;
                                    }
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
                                    &.option {
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        color: #707070;
                                        max-width: 20rem;
                                    }
                                    &.v_bar {
                                        width: 0.1rem;
                                        height: 0.5rem;
                                        background: #e8e8e8;
                                    }
                                }
                            }
                        }
                    }
                    .pictures {
                        margin-top: 1.7rem;
                        li {
                            margin-bottom: 1rem;
                        }
                    }
                    &.on {
                        height: auto;
                        .default {
                            .content {
                                .top {
                                    .text {
                                        overflow: auto;
                                        -webkit-line-clamp: initial;
                                        max-height: none;
                                    }
                                    .icons {
                                        .arrow {
                                            @include mixins.arrow(1rem, 0.1rem, 45deg, up, var(--main-color));
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
