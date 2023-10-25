import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import WritableReview from '@components/mypage/wishlist/WritableReview';
import PageTab from '@components/PageTab';
import { useState, useRef, useEffect } from 'react';
import sendAxios from 'utils/sendAxios';
import scrollCheck from 'utils/scrollCheck';
import ReviewList from '@components/mypage/review/ReviewList';
import { reviewData } from '@components/main/BestReview';
import PageTitle from '@components/PageTitle';

interface writableReview {
    order_id: string;
    product_id: string;
    option_name: string;
    write_until: string;
    img: string;
    ordered_options_idx: number;
    brand: string;
    expired: boolean;
}

const TEXTS = ['작성가능한 구매평', '작성한 구매평'];

export default function Review({ read, write }) {
    const [tab, setTab] = useState(0);
    const [datas, setDatas] = useState({
        write: { data: write.data?.reviews?.list, curPage: 1, totalPage: write.data?.reviews?.pagination.totalPages },
        read: { data: read.data?.reviews?.list, curPage: 1, totalPage: read.data?.reviews?.pagination.totalPages }
    });
    const counts = [write.data.reviews.write, read.data.reviews.read];
    const tabRef = useRef<HTMLDivElement>(null);
    const [tabHeight, setTabHeight] = useState(0);
    const writeUlRef = useRef<HTMLUListElement>();
    const ReadUlRef = useRef<HTMLUListElement>();

    useEffect(() => {
        const getData = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/reviews/user`,
                params: { type: 'write', page: datas.write.curPage + 1 }
            };
            const success = (res) => {
                setDatas((prev) => ({ ...prev, write: { ...prev.write, data: [...prev.write.data, ...res.reviews.list], curPage: prev.write.curPage + 1 } }));
            };
            await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        };

        if (datas.write.totalPage > datas.write.curPage) {
            const intersectionObserver = scrollCheck(writeUlRef.current.lastChild as HTMLLIElement, getData);

            return () => intersectionObserver.disconnect();
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/reviews/user`,
                params: { type: 'read', page: datas.read.curPage + 1 }
            };
            const success = (res) => {
                setDatas((prev) => ({ ...prev, read: { ...prev.read, data: [...prev.read.data, ...res.reviews.list], curPage: prev.read.curPage + 1 } }));
            };
            await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        };

        if (datas.read.totalPage > datas.read.curPage) {
            const intersectionObserver = scrollCheck(ReadUlRef.current.lastChild as HTMLLIElement, getData);

            return () => intersectionObserver.disconnect();
        }
    }, []);

    useEffect(() => {
        if (tabRef.current) {
            setTabHeight((tabRef.current.firstChild as HTMLDivElement).offsetHeight);
        }
    }, []);

    return (
        <>
            <PageTitle title="홍언니고기 - 구매평 관리" />
            <MypageTitle back={true}>구매평 관리</MypageTitle>
            <CheckData data={read}>
                <CheckData data={write}>
                    {read.state === 'success' && (
                        <>
                            <div className="tab" ref={tabRef}>
                                <PageTab texts={TEXTS} opt={counts} tab={tab} setTab={setTab} tabRef={tabRef} />
                            </div>
                            <div className={`content writeReview ${tab === 0 ? 'on' : ''}`}>
                                {datas.write.data.length === 0 ? (
                                    <p>작성가능한 구매평이 없습니다.</p>
                                ) : (
                                    <ul ref={writeUlRef}>
                                        {datas.write.data.map((list: writableReview, idx: number) => (
                                            <WritableReview key={idx} data={list} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className={`content readReview ${tab === 1 ? 'on' : ''}`}>
                                {datas.read.data.length === 0 ? (
                                    <p>작성한 구매평이 없습니다.</p>
                                ) : (
                                    <ul ref={ReadUlRef}>
                                        {datas.read.data.map((list: reviewData, idx: number) => (
                                            <ReviewList key={idx} data={list} tab={tab} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <style jsx global>{`
                                .tab {
                                    ul {
                                        display: flex;
                                        li {
                                            display: block;
                                            width: 50%;
                                            height: 4.3rem;
                                            text-align: center;
                                            font-size: 1.6rem;
                                            color: #767676;
                                            font-weight: 500;
                                            &:first-child {
                                                span {
                                                    color: var(--main-color);
                                                }
                                            }
                                            span {
                                                vertical-align: baseline;
                                                font-weight: 700;
                                                margin-left: 0.5rem;
                                                color: #767676;
                                            }
                                            &.active {
                                                font-weight: 700;
                                                background: #f8f8fa;
                                                color: #000;
                                            }
                                        }
                                    }
                                }
                            `}</style>
                            <style jsx>{`
                                $tabHeight: ${tabHeight}px;
                                .tab {
                                    padding-top: $tabHeight;
                                    position: relative;
                                }
                                .content {
                                    display: none;
                                    padding: 1.2rem var(--side-padding);
                                    &.on {
                                        display: block;
                                        background: #f8f8fa;
                                        p {
                                            color: #a2a2a2;
                                            font-size: 1.6rem;
                                            padding: 4rem 0;
                                            text-align: center;
                                        }
                                    }
                                }
                            `}</style>
                        </>
                    )}
                </CheckData>
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config1 = {
        method: 'get',
        url: `${process.env.API_HOST}/reviews/user`,
        params: { type: 'read' }
    };
    const read = await sendAxios({ config: config1, context });

    const config2 = {
        method: 'get',
        url: `${process.env.API_HOST}/reviews/user`,
        params: { type: 'write' }
    };
    const write = await sendAxios({ config: config2, context });

    return {
        props: {
            read,
            write
        }
    };
};
