import CheckData from '@components/CheckData';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

interface basicInfo {
    idx: number;
    category: string;
    detail: string;
    property_id: string;
    resource_idx: number;
}

interface shipping {
    division: string;
    property_id: string;
    category: string;
    detail: string;
}

interface cancel {
    division: string;
    property_id: string;
    category: string;
    detail: string;
}

export default function BasicInfo({ product_id }) {
    const [datas, setDatas] = useState({ state: null, data: null });

    useEffect(() => {
        const getData = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/product/description/${product_id}`, params: { tab: 'info' } };
            const data = await sendAxios({ config });
            setDatas(data);
        };
        getData();
    }, []);

    return (
        <>
            {datas.state && (
                <CheckData data={datas}>
                    {datas.state === 'success' && (
                        <div className="wrap">
                            {datas.data.fundamental.info.map((item: basicInfo[], idx: number) => (
                                <div className="section" key={idx}>
                                    <h2>
                                        <span>상품기본정보</span>
                                    </h2>
                                    <ul className="content grid">
                                        {item.map((list, idx) => (
                                            <li key={idx}>
                                                <p>{list.category}</p>
                                                <p>{list.detail}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="section">
                                <h2>
                                    <span>배송안내</span>
                                </h2>
                                <ul className="content grid shipment">
                                    {datas.data.fundamental.shipping.map((item: shipping, idx: number) => (
                                        <li key={idx}>
                                            <p>{item.category}</p>
                                            <p>{item.detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="section">
                                <h2>
                                    <span>취소/반품/교환안내</span>
                                </h2>
                                <ul className="content">
                                    {datas.data.fundamental.cancel.map((item: cancel, idx: number) => (
                                        <li key={idx}>
                                            <p>{item.detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <style jsx>{`
                                .wrap {
                                    padding: 0 var(--side-padding) 4rem;
                                    .section {
                                        padding-top: 4rem;
                                        h2 {
                                            span {
                                                display: inline-block;
                                                font-size: 2rem;
                                                font-weight: 700;
                                                padding: 0 1.5rem 0.7rem;
                                                border-bottom: 0.1rem solid #a2a2a2;
                                            }
                                        }
                                        .content {
                                            padding: 1rem 1.5rem;
                                            font-size: 1.4rem;
                                            li {
                                                padding: 0.5rem 0 1rem;
                                                p {
                                                    word-break: keep-all;
                                                    white-space: pre-wrap;
                                                    &:first-child {
                                                        color: #191919;
                                                    }
                                                    &:last-child {
                                                        color: #707070;
                                                    }
                                                }
                                            }
                                            &.grid {
                                                li {
                                                    display: grid;
                                                    grid-template-columns: repeat(2, 1fr);
                                                    column-gap: 2rem;
                                                }
                                            }
                                        }
                                    }
                                }
                            `}</style>
                        </div>
                    )}
                </CheckData>
            )}
        </>
    );
}
