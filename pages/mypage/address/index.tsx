import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import { shipInfo } from '@components/order/DestinationInfo';
import AddrAddBtn from '@components/order/popup/AddrAddBtn';
import AddrPop from '@components/order/popup/AddrPop';
import ModifyPop from '@components/order/popup/ModifyPop';
import { addrData } from '@components/order/popup/AddrList';
import PageTitle from '@components/PageTitle';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function Address({ data }) {
    const [lists, setLists] = useState<shipInfo[]>(data.data?.data);
    const [popOn2, setPopOn2] = useState({ on: '', data: addrData });
    const [selectedNum, setSelectedNum] = useState(() => {
        if (lists?.length !== 0) {
            const shipping = lists.filter((li: shipInfo) => li.default_address === 'Y')[0].shipping;
            return { prev: shipping, current: shipping };
        } else {
            return { prev: null, current: null };
        }
    });

    const handleAddr = () => {
        setPopOn2({ on: 'on', data: { shipping: null, user_name: '', phone: '', zipcode: '', address: '', detailed_address: '', default_address: '' } });
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 배송지관리" />
            <div className="container">
                <MypageTitle back={true}>
                    배송지관리
                    <div className="btn">
                        <AddrAddBtn setPopOn2={setPopOn2} />
                    </div>
                    <style jsx>{`
                        .btn {
                            position: absolute;
                            top: 50%;
                            right: var(--side-padding);
                            transform: translateY(-50%);
                        }
                    `}</style>
                </MypageTitle>
                <CheckData data={data}>
                    {data.state === 'success' && (
                        <>
                            {lists.length === 0 ? (
                                <>
                                    <div className="empty">
                                        <p>등록된 배송지가 없습니다.</p>
                                    </div>
                                    <ModifyPop key={popOn2.data.shipping} popOn={popOn2} setPopOn={setPopOn2} setLists={setLists} handleAddr={handleAddr} setSelectedNum={setSelectedNum} length={lists.length} />
                                </>
                            ) : (
                                <>
                                    <AddrPop lists={lists} setLists={setLists} selectedNum={selectedNum} setSelectedNum={setSelectedNum} popOn2={popOn2} setPopOn2={setPopOn2} type="mypage" />
                                </>
                            )}

                            <style jsx global>{`
                                .container {
                                    .box {
                                        h2 {
                                            height: 4.5rem;
                                            line-height: 4.5rem;
                                            padding: 0 var(--side-padding-inner);
                                            font-size: 1.8rem;
                                            font-weight: 500;
                                            background: linear-gradient(to right, #f8f8fa, transparent);
                                        }
                                        > div:not(.fullwd) {
                                            padding: 1.5rem var(--side-padding-inner);
                                        }
                                    }
                                    .lists {
                                        > li {
                                            border-bottom: 1px solid #e8e8e8;
                                            padding: 1.5rem var(--side-padding-inner);
                                            > label {
                                                display: flex;
                                                > div {
                                                    > p {
                                                        &:first-child {
                                                            display: flex;
                                                            align-items: center;
                                                            line-height: 2.4rem;
                                                            font-size: 1.6rem;
                                                            font-weight: 500;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            `}</style>
                            <style jsx>{`
                                .empty {
                                    p {
                                        text-align: center;
                                        font-size: 1.4rem;
                                        color: #a2a2a2;
                                        padding: 0 0 5rem 0;
                                    }
                                }
                            `}</style>
                        </>
                    )}
                </CheckData>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const query = context.query;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/auth/user-address/list`,
        params: query
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
}
