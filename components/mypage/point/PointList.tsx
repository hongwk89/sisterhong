export default function PointList({ data }) {
    return (
        <>
            <li>
                {data.type === 'R' ? <span className="stamp save">적립</span> : data.type === 'U' ? <span className="stamp use">사용</span> : <span className="stamp expired">소멸</span>}
                <span className="point">{data.amount}원</span>
                <div>
                    <p>{data.comment}</p>
                    {data.type === 'R' ? <p className="date">사용기한: ~{data.date}</p> : data.type === 'U' ? <p className="date">사용일시: {data.date}</p> : <p className="date">소멸일시: {data.date}</p>}
                </div>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    align-items: center;
                    padding: 2rem var(--side-padding);
                    border-bottom: 0.1rem solid #e8e8e8;
                    &:last-child {
                        border-bottom: 0;
                    }
                    span {
                        display: block;
                        &.stamp {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 3.5rem;
                            height: 3.5rem;
                            border-radius: 50%;
                            font-size: 1.2rem;
                            font-weight: 500;
                            margin-right: 1rem;
                            flex: 0 0 3.5rem;
                            &.expired {
                                background: #a2a2a2;
                                color: #fff;
                            }
                            &.use {
                                border: 0.1rem solid var(--main-color);
                                color: var(--main-color);
                            }
                            &.save {
                                background: var(--main-color);
                                color: #fff;
                            }
                        }
                        &.point {
                            font-size: 1.8rem;
                            font-weight: 500;
                            flex: 0 0 9rem;
                        }
                    }
                    p {
                        width: auto;
                        font-size: 1.4rem;
                        flex: 1;
                        color: #707070;
                        font-weight: 500;
                        &.date {
                            font-size: 1rem;
                            color: #a2a2a2;
                        }
                    }
                }
            `}</style>
        </>
    );
}
