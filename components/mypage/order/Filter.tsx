import FilterOne from './FilterOne';

const STATUS = ['전체', '배송중', '배송완료', '취소'];
const PERIOD = ['당일', '1개월', '3개월', '6개월', '기간설정'];

export default function Filter({ filter, setFilter, searchCalendar }) {
    return (
        <>
            <div>
                <FilterOne data={STATUS} filter={filter} setFilter={setFilter} type="status">
                    <h3>주문진행상태</h3>
                </FilterOne>
            </div>
            <div>
                <FilterOne data={PERIOD} filter={filter} setFilter={setFilter} searchCalendar={searchCalendar} type="period">
                    <h3>조회기간설정</h3>
                </FilterOne>
            </div>
            <style jsx>{`
                div {
                    &:first-child {
                        margin-bottom: 2rem;
                    }
                    h3 {
                        font-size: 1.6rem;
                        font-weight: 500;
                    }
                }
            `}</style>
        </>
    );
}
