import CheckData from '@components/CheckData';
import AttachFiles from '@components/mypage/contact/AttachFiles';
import MypageTitle from '@components/mypage/MypageTitle';
import Rating from '@components/mypage/review/Rating';
import Textarea from '@components/mypage/review/Textarea';
import CustomImage from '@components/CustomImage';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import PageTitle from '@components/PageTitle';

interface hashtag {
    property: string;
    value: string;
}

const REVIEW_INIT_VALUE = '어떤 점이 좋으셨나요?';

export default function Write({ data }) {
    const router = useRouter();
    const [imgList, setImgList] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hashtag, setHashtag] = useState([]);
    const textareaRef = useRef<HTMLTextAreaElement>();
    const hashtagRef = useRef<HTMLUListElement>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.dataset.property;

        if (!hashtag.includes(val)) {
            if (hashtag.length >= 4) {
                alert('해시태그는 최대 4개까지만 선택 가능합니다.');
                e.target.checked = false;
                return;
            }
            setHashtag((prev) => [...prev, val]);
        } else {
            setHashtag((prev) => prev.filter((state) => state !== val));
        }
    };

    const handleSubmit = async () => {
        if (score === 0) {
            alert('별점을 남겨주세요');
            return;
        }

        if (hashtag.length === 0) {
            alert('키워드를 최소 1개 이상 체크해주세요');
            return;
        }

        const textarea = textareaRef.current.value === REVIEW_INIT_VALUE ? '' : textareaRef.current.value;

        if (hashtag.length === 0 && textarea.length > 0 && textarea.length < 20) {
            alert('내용을 20자이상 작성해주세요');
            return;
        }

        const imgTotalSize = imgList.reduce((tot, cur) => (tot += cur.size), 0);

        const imgMB = imgTotalSize / 1024 ** 2;

        if (imgMB > 9) {
            alert('첨부 이미지들의 총 합이 9MB 넘을 수 없습니다.');
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append('contents', textarea);
        formData.append('score', score.toString());
        formData.append('order_id', data.data.order_id);
        formData.append('option_idx', data.data.ordered_options_idx);
        formData.append('hashtag', JSON.stringify(hashtag));
        imgList.map((img) => {
            formData.append('files[]', img);
        });

        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/review/add`,
            data: formData
        };
        const success = () => {
            alert('구매평이 작성되었습니다.');
            router.push('/mypage/review');
        };
        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        setLoading(false);
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 구매평 작성" />
            <MypageTitle back={true} url="back">
                구매평 작성
            </MypageTitle>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="wrap">
                            <div className="product_info">
                                <span className="image">
                                    <CustomImage src={data.data.img} width={200} height={200} alt={data.data.product_name} />
                                </span>
                                <div>
                                    <h3>{data.data.product_name}</h3>
                                    <span>{data.data.option_name}</span>
                                </div>
                            </div>
                            <div className="rating">
                                <p>상품은 어떠셨나요?</p>
                                <Rating score={score} setScore={setScore} />
                                <div className="hashtag">
                                    <ul ref={hashtagRef}>
                                        {data.data.hashtag.map((list: hashtag, idx: number) => (
                                            <li key={idx}>
                                                <input id={`hashtag${idx}`} type="checkbox" data-property={list.property} onChange={handleChange} />
                                                <label htmlFor={`hashtag${idx}`}>{list.value}</label>
                                            </li>
                                        ))}
                                    </ul>
                                    <p>최대 4개 선택가능</p>
                                </div>
                            </div>
                            <Textarea textareaRef={textareaRef} reviewInitValue={REVIEW_INIT_VALUE} />
                            <div className="pictures">
                                <h3>사진/동영상 첨부</h3>
                                <AttachFiles imgList={imgList} setImgList={setImgList} />
                            </div>
                            <div className="btn_area">
                                <button type="button" className="commonButton typeRed" onClick={handleSubmit} disabled={loading}>
                                    등록
                                </button>
                            </div>
                        </div>
                        <style jsx global>{`
                            .wrap {
                                .pictures {
                                    .attachList {
                                        padding: 0 var(--side-padding);
                                    }
                                }
                            }
                        `}</style>
                        <style jsx>{`
                            @use 'styles/mixins';
                            .wrap {
                                padding-bottom: 5rem;
                                .product_info {
                                    background: #f8f8fa;
                                    padding: 1.5rem var(--side-padding-inner);
                                    display: flex;
                                    gap: 1rem;
                                    .image {
                                        display: block;
                                        width: 10rem;
                                        height: 10rem;
                                    }
                                    > div {
                                        width: calc(100% - 11rem);
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                        h3 {
                                            font-size: 1.8rem;
                                            font-weight: 700;
                                            margin-bottom: 0.3rem;
                                        }
                                        span {
                                            font-size: 1.4rem;
                                            font-weight: 500;
                                            color: #707070;
                                        }
                                        ul {
                                            li {
                                                font-size: 1.2rem;
                                                color: #a2a2a2;
                                            }
                                        }
                                    }
                                }
                                .rating {
                                    padding: 4rem 0 2rem;
                                    text-align: center;
                                    > p {
                                        font-size: 1.8rem;
                                        font-weight: 500;
                                    }
                                    .hashtag {
                                        width: 28rem;
                                        margin: 2rem auto 0;
                                        ul {
                                            margin-bottom: 0.5rem;
                                            display: grid;
                                            justify-content: space-between;
                                            row-gap: 1rem;
                                            grid-template-columns: 7.8rem 9.2rem 7.8rem;
                                            li {
                                                input {
                                                    display: none;
                                                    &:checked + label {
                                                        background: var(--main-color);
                                                        color: #fff;
                                                    }
                                                }
                                                label {
                                                    display: block;
                                                    font-size: 1.6rem;
                                                    padding: 0.5rem 0;
                                                    text-align: center;
                                                    border-radius: 1rem;
                                                    border: 0.1rem solid #e8e8e8;
                                                    cursor: pointer;
                                                }
                                            }
                                        }
                                        > p {
                                            text-align: right;
                                            font-size: 1.2rem;
                                            color: #707070;
                                        }
                                    }
                                }
                                .pictures {
                                    margin: 3rem 0 4rem;
                                    h3 {
                                        padding: 0 var(--side-padding);
                                        font-size: 1.8rem;
                                        font-weight: 500;
                                        margin-bottom: 1rem;
                                    }
                                }
                                .btn_area {
                                    padding: 0 var(--side-padding);
                                    button {
                                        font-size: 2.2rem;
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
    const query = context.query;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/review/writer`,
        params: query
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
