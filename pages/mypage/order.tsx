import CheckData from '@components/CheckData';
import MypageTitle from '@components/mypage/MypageTitle';
import Filter from '@components/mypage/order/Filter';
import MypageOrderList from '@components/mypage/order/MypageOrderList';
import PageTitle from '@components/PageTitle';
import { useEffect, useRef, useState } from 'react';
import getDate from 'utils/getDate';
import scrollCheck from 'utils/scrollCheck';
import sendAxios from 'utils/sendAxios';

interface params {
    page?: number;
    start_date: string;
    end_date: string;
}

interface orderData {
    status: string;
}

const FILTERDATA = {
    status: {
        0: '전체',
        1: '배송중',
        2: '배송완료',
        3: '주문취소'
    },
    period: {
        0: '당일',
        1: '1개월',
        2: '3개월',
        3: '6개월',
        4: '기간설정'
    }
};

export default function Order({ data, count }) {
    const [filter, setFilter] = useState({ status: 0, period: 2 });
    const [datum, setDatum] = useState(data.data?.orders);
    const currentAllData = useRef(datum);
    const pageNum = useRef({ curPage: data.data?.pagination?.currentPage, endPage: data.data?.pagination?.endPage });
    const [lastLi, setLastLi] = useState();

    const setDate = () => {
        const date = new Date();

        if (FILTERDATA.period[filter.period] === '1개월') {
            date.setMonth(date.getMonth() - 1);
        } else if (FILTERDATA.period[filter.period] === '3개월') {
            date.setMonth(date.getMonth() - 3);
        } else if (FILTERDATA.period[filter.period] === '6개월') {
            date.setMonth(date.getMonth() - 6);
        }

        return date;
    };

    const filterData = (data: orderData[]): orderData[] => {
        if (filter.status !== 0) {
            const filteredData = data.filter((list) => list.status === FILTERDATA.status[filter.status]);
            return filteredData;
        }

        return data;
    };

    const axiosOrders = async (params: params) => {
        const config = { method: 'get', url: `${process.env.API_HOST}/orders`, params: { ...params, limit: count } };
        const success = (res) => {
            pageNum.current.curPage = res.pagination.currentPage;
            pageNum.current.endPage = res.pagination.endPage;

            if (params.page !== 1) {
                setDatum((prev) => filterData([...prev, ...res.orders]));
                currentAllData.current.push(...res.orders);

                return;
            }
            setDatum(filterData(res.orders));
            currentAllData.current = res.orders;
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    const periodFilter = (num = null) => {
        const params = {
            page: num ? num : 1,
            start_date: getDate('mypage', setDate() as Date).split(' ')[0],
            end_date: getDate('mypage').split(' ')[0]
        };

        axiosOrders(params);
    };

    const searchCalendar = async (date: { start: Date; end: Date }) => {
        const params = { start_date: getDate('mypage', date.start).split(' ')[0], end_date: getDate('mypage', date.end).split(' ')[0] };

        axiosOrders(params);
    };

    useEffect(() => {
        if (datum) {
            periodFilter();
        }
    }, [filter.period]);

    useEffect(() => {
        if (datum) {
            setDatum(filterData(currentAllData.current));
        }
    }, [filter.status]);

    useEffect(() => {
        if (lastLi) {
            const init = scrollCheck(lastLi, () => {
                if (pageNum.current.curPage < pageNum.current.endPage) {
                    periodFilter(pageNum.current.curPage + 1);
                }
            });

            return () => init.disconnect();
        }
    }, [lastLi]);

    return (
        <>
            <PageTitle title="홍언니고기 - 주문조회" />
            <MypageTitle back={true}>주문조회</MypageTitle>
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="filter">
                            <Filter filter={filter} setFilter={setFilter} searchCalendar={searchCalendar} />
                        </div>
                        {datum.length !== 0 ? (
                            <div>
                                <MypageOrderList data={datum} type="list" setLastLi={setLastLi} />
                            </div>
                        ) : (
                            <div className="empty">
                                <p>주문 내역이 없습니다</p>
                            </div>
                        )}
                        <style jsx>{`
                            .filter {
                                padding: 1.5rem var(--side-padding-inner);
                                box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
                            }
                            .empty {
                                padding: 3rem 0;
                                text-align: center;
                                font-size: 1.4rem;
                                p {
                                    color: #a2a2a2;
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
    const count = 20;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/orders`,
        params: { limit: count }
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data,
            count
        }
    };
};
