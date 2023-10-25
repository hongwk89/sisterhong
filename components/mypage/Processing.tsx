import Link from 'next/link';

const DELIVERY_PROCESS = ['입금대기', '결제완료', '출고완료', '배송중', '배송완료'];

export default function Processing({ data }) {
    return (
        <>
            <h2>
                진행중인 주문 <span className="smallTxt">(최근 3개월)</span>
                <Link legacyBehavior href="/mypage/order">
                    <a className="more">
                        더보기 <span className="arrow"></span>
                    </a>
                </Link>
            </h2>
            <div>
                <ul>
                    {Object.keys(data.orders_info).map((key, idx) => (
                        <li key={idx}>
                            <span className={`${data.orders_info[key] !== 0 ? 'active' : ''}`}>{data.orders_info[key]}</span>
                            <span>{DELIVERY_PROCESS[idx]}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                h2 {
                    display: flex;
                    align-items: baseline;
                    font-size: 1.8rem;
                    .smallTxt {
                        margin-left: 1rem;
                        font-size: 1.2rem;
                        font-weight: 400;
                        color: #a2a2a2;
                    }
                    .more {
                        display: flex;
                        align-items: center;
                        margin-left: auto;
                        font-size: 1.2rem;
                        color: #707070;
                        font-weight: 400;
                        .arrow {
                            display: block;
                            position: relative;
                            width: 0.7rem;
                            height: 0.7rem;
                            margin-left: 0.8rem;
                            @include mixins.arrow(0.7rem, 0.1rem, 45deg, right, #707070);
                        }
                    }
                }
                div {
                    margin-top: 2rem;
                    ul {
                        display: flex;
                        justify-content: space-between;
                        li {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            span {
                                &:first-child {
                                    font-family: 'roboto';
                                    font-size: 2.2rem;
                                    color: #a2a2a2;
                                    &.active {
                                        color: var(--main-color);
                                    }
                                }
                                &:last-child {
                                    font-size: 1.2rem;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
