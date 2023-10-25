import { Fragment, useEffect, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import Cookies from 'universal-cookie';
import getDate from 'utils/getDate';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import ReviewContent from './ReviewContent';
import NoticeContent from './NoticeContent';

interface noticePop {
    title: string;
    target_url: string;
    width: number;
    height: number;
    image: string;
}

interface reviewPop {
    order_id: string;
    option_name: string;
    ordered_option_idx: number;
    delivered_at: string;
    product_idx: number;
    product_name: string;
    reviews: number;
    img: string;
    img_width: number;
    img_height: number;
}

export default function MainPopup({ name, url }) {
    const [data, setData] = useState(null);
    const cookies = new Cookies();
    const { token } = useTokenStore();
    const num = useRef(0);

    const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
        ((e.target as HTMLButtonElement).closest('.popup') as HTMLDivElement).style.display = 'none';
    };

    const closeOneDay = (e: React.MouseEvent | React.TouchEvent, cookieName: string) => {
        cookies.set(cookieName, 'true', {
            path: '/',
            expires: new Date(getDate('popup'))
        });
        handleClose(e);
    };

    useEffect(() => {
        if ((name === 'sisReviewPop' && token) || name === 'sisNoticePop') {
            const getReviews = async () => {
                const config = { method: 'get', url: `${process.env.API_HOST}${url}` };
                const result = await sendAxios({ config });

                if (result.state === 'success') {
                    num.current = Math.floor(Math.random() * result.data.length);
                    setData(result.data);
                } else {
                    console.log(result.data);
                }
            };
            getReviews();
        }
    }, [token]);

    return (
        <>
            {((name === 'sisReviewPop' && token && data) || (data && name === 'sisNoticePop')) && (
                <>
                    {data.map((list: noticePop | reviewPop, idx: number) => {
                        const cookieName = name === 'sisReviewPop' ? 'sisReviewPop' : name + idx;

                        if (!cookies.get(cookieName) && ((name === 'sisReviewPop' && idx === num.current) || name === 'sisNoticePop')) {
                            return (
                                <Fragment key={idx}>
                                    <div className="popup">
                                        {name === 'sisReviewPop' && <ReviewContent data={list} length={data.length} />}
                                        {name === 'sisNoticePop' && <NoticeContent data={list} />}
                                        <div className="btns">
                                            <button type="button" onClick={(e) => closeOneDay(e, cookieName)}>
                                                오늘 보지 않음
                                            </button>
                                            <button type="button" onClick={handleClose}>
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                    <style jsx>{`
                                        .popup {
                                            position: absolute;
                                            top: 50%;
                                            transform: translateY(-55%);
                                            background: linear-gradient(to bottom, var(--main-color) 1.5rem, #fff 1.5rem);
                                            border-radius: 1.5rem;
                                            box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
                                            width: 85%;
                                            margin: 0 7.5%;
                                            max-width: calc(((var(--max-width) - var(--gap)) / 2) * 0.85);
                                            padding-top: 1.5rem;
                                            text-align: center;
                                            z-index: 10;
                                            .btns {
                                                display: flex;
                                                height: 4rem;
                                                button {
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    width: 50%;
                                                    height: 100%;
                                                    font-size: 1.4rem;
                                                    font-weight: 500;
                                                    &:first-child {
                                                        background: #e8e8e8;
                                                    }
                                                    &:last-child {
                                                        background: #f8f8fa;
                                                    }
                                                }
                                            }
                                        }
                                        @media only screen and (min-width: 500px) {
                                            .popup {
                                                margin: calc(((var(--max-width) - var(--gap)) / 2) * 0.15 / 2);
                                            }
                                        }
                                    `}</style>
                                </Fragment>
                            );
                        }
                    })}
                </>
            )}
        </>
    );
}
