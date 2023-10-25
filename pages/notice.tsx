import CheckData from '@components/CheckData';
import PageTitle from '@components/PageTitle';
import InnerHtml from '@components/product/detailPage/productInfo/InnerHtml';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

interface notice {
    content: string;
    created_at: string;
    idx: number;
    property: string;
    property_value: string;
    title: string;
}

export function NoticeList({ data }) {
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn((prev) => !prev);
    };

    return (
        <>
            <li className={`${on ? 'on' : ''}`}>
                <div className="title" onClick={handleClick}>
                    <h3>{data.title}</h3>
                    <span className="date">{data.created_at}</span>
                    <button type="button" className="arrow">
                        <span className="hidden">열림/닫힘 버튼</span>
                    </button>
                </div>
                <div className="content">
                    <div className="inner">
                        <InnerHtml data={data.content} />
                    </div>
                </div>
            </li>
            <style jsx>{`
                @use 'styles/mixins';
                li {
                    border-top: 0.2rem solid #f8f8fa;
                    box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.05);
                    margin-bottom: 2rem;
                    .title {
                        position: relative;
                        padding: 2rem var(--side-padding-inner);
                        cursor: pointer;
                        h3 {
                            font-size: 1.8rem;
                            font-weight: 500;
                            width: calc(90% - 4rem);
                        }
                        .date {
                            font-family: 'roboto';
                            font-size: 1.4rem;
                            color: #a2a2a2;
                        }
                        .arrow {
                            position: absolute;
                            width: 3rem;
                            height: 3rem;
                            top: 50%;
                            right: 1.5rem;
                            transform: translateY(-50%);
                            @include mixins.arrow(1rem, 0.1rem, 45deg, down, #000);
                        }
                    }
                    .content {
                        display: none;
                        .inner {
                            border-top: 1px solid #e8e8e8;
                            padding: 2rem var(--side-padding);
                        }
                    }
                    &.on {
                        background: #f8f8fa;
                        .title {
                            .arrow {
                                @include mixins.arrow(1rem, 0.1rem, 45deg, up, #000);
                            }
                        }
                        .content {
                            display: block;
                        }
                    }
                }
            `}</style>
        </>
    );
}

export default function Notice({ data }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 공지사항" />
            <h1>공지사항</h1>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <ul>
                        {data.data.list.notice['1'].map((data: notice, idx: number) => (
                            <NoticeList key={idx} data={data} />
                        ))}
                    </ul>
                )}
            </CheckData>
            <style jsx>{`
                h1 {
                    font-size: 2.2rem;
                    padding: 3.5rem 0;
                    text-align: center;
                }
            `}</style>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/articles/list/notice`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
