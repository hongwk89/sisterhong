import AskLists from '@components/AskLists';
import CheckData from '@components/CheckData';
import { CATEGORY } from '@components/mypage/contact/ContactListOne';
import PageTitle from '@components/PageTitle';
import { Fragment, useState } from 'react';
import sendAxios from 'utils/sendAxios';

interface askList {
    idx: number;
    property: string;
    property_value: string;
    title: string;
    content: string;
    created_at: string;
}

export function OftenAskList({ data }) {
    return (
        <ul>
            {data.map((list: askList, idx: number) => (
                <AskLists key={idx} data={list} />
            ))}
        </ul>
    );
}

export default function OftenAsk({ data }) {
    const [tab, setTab] = useState(0);

    const handleTab = (idx: number) => {
        setTab(idx);
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 자주 묻는 질문" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="wrap">
                            <h1>자주 묻는 질문</h1>
                            <ul className="tab">
                                {Object.keys(CATEGORY).map((kind, idx, arr) => (
                                    <Fragment key={idx}>
                                        <li className={`${tab === idx ? 'on' : ''}`} onClick={() => handleTab(idx)}>
                                            {CATEGORY[kind]}
                                        </li>
                                        {idx !== arr.length - 1 && (
                                            <li>
                                                <span className="v_bar"></span>
                                            </li>
                                        )}
                                    </Fragment>
                                ))}
                            </ul>
                            <OftenAskList key={tab} data={data.data.list.support[tab + 1]} />
                        </div>
                        <style jsx>{`
                            .wrap {
                                padding: 0 var(--side-padding) 5rem;
                                h1 {
                                    font-size: 2.2rem;
                                    font-weight: 700;
                                    text-align: center;
                                    padding: 4rem 0;
                                }
                                .tab {
                                    display: flex;
                                    justify-content: space-evenly;
                                    align-items: center;
                                    margin-bottom: 2rem;
                                    li {
                                        font-size: 1.6rem;
                                        color: #767676;
                                        cursor: pointer;
                                        &.on {
                                            color: var(--main-color);
                                            border-bottom: 0.1rem solid var(--main-color);
                                        }
                                        .v_bar {
                                            display: block;
                                            width: 0.1rem;
                                            height: 0.8rem;
                                            background: #a2a2a2;
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

export async function getServerSideProps(context) {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/articles/list/support`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
}
