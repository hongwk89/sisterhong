import CartListOne from '@components/cart/CartListOne';
import usePopToggle from '@hooks/usePopToggle';
import { useEffect, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import MypageOrderListTop from './MypageOrderListTop';
import TrackingInfoPop from './TrackingInfoPop';

interface orderList {
    order_idx: number;
    order_id: string;
    created_at: string;
    delivered_at: string;
    status: string;
    products: productList[];
}

export interface productList {
    product_id: string;
    name: string;
    image: {};
    options: {};
    brand: [];
}

export default function MypageOrderList({ data, type, setTracking = null, setLastLi = null }) {
    const ulRef = useRef<HTMLUListElement>();
    const { popOn, popOpen, popClose } = usePopToggle();
    const [track, setTrack] = useState(null);

    const pacelPop = async (order_id: string) => {
        const config = { method: 'get', url: `${process.env.API_HOST}/parcel/order/service`, params: { order_id } };
        const result = await sendAxios({ config });

        if (result.state === 'fail') {
            alert(result.data.message);
            return;
        }

        if (result.data.length === 0) {
            alert(`배송조회 실패했습니다. 관리자에 문의헤주세요.`);
            return;
        }

        setTrack(result.data);
        popOpen();
    };

    useEffect(() => {
        if (type === 'list') {
            setLastLi(ulRef.current.lastChild as HTMLLIElement);
        }
    }, [data]);

    return (
        <>
            <ul className="listWrap" ref={ulRef}>
                {data.map((lists: orderList, idx: number) => {
                    return (
                        <li key={idx}>
                            <MypageOrderListTop data={lists} type={type} setTracking={setTracking} pacelPop={pacelPop} />
                            <div className="wrap">
                                <ul>
                                    {lists.products?.map((list: productList, idx: number) => {
                                        const popData = { order_id: lists.order_id, image: list.image, product_name: list.name, order_status: lists.status, delivered_at: lists.delivered_at };

                                        return <CartListOne key={idx} type="mypage" data={list} popData={popData} />;
                                    })}
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <TrackingInfoPop track={track} popOn={popOn} popClose={popClose} />
            <style jsx>{`
                .listWrap {
                    > li {
                        margin: 4rem 0;
                        box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.03);
                        &:first-child {
                            margin-top: 2rem;
                        }

                        .wrap {
                            padding: 0 var(--side-padding-inner);
                        }
                    }
                }
            `}</style>
        </>
    );
}
