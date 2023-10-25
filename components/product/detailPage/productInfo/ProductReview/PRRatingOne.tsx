export default function PRRatingOne({ star, num, top, total }) {
    const per = (num / total) * 100;
    const arr = [];

    for (let i = 0; i < star; i++) {
        arr.push('');
    }

    return (
        <>
            <div className={`${star === top ? 'on' : ''}`}>
                <ul>
                    {arr.map((star, idx) => (
                        <li key={idx}>
                            <svg width="100%" height="100%" viewBox="0 0 60 60" preserveAspectRatio="none">
                                <path className="star" d="M30,0l9,20.142,21,2.776L44.562,38.142,48.541,60,30,49.267,11.459,60l3.979-21.858L0,22.918l21-2.776Z" />
                            </svg>
                        </li>
                    ))}
                </ul>
                <div className="bar_bg">
                    <div className="bar"></div>
                </div>
            </div>
            <style jsx>{`
                $per: ${per}%;
                div {
                    display: flex;
                    align-items: center;
                    ul {
                        width: 25%;
                        margin-right: 5%;
                        display: flex;
                        justify-content: right;
                        li {
                            position: relative;
                            width: 18%;
                            padding-top: 18%;
                            margin-right: 2.5%;
                            &:last-child {
                                margin-right: 0;
                            }
                            svg {
                                position: absolute;
                                top: 0;
                                left: 0;
                                path {
                                    fill: #767676;
                                    @at-root div.on ul li svg path {
                                        fill: var(--main-color);
                                    }
                                }
                            }
                        }
                    }
                    .bar_bg {
                        width: 70%;
                        height: 0.6rem;
                        background: #e8e8e8;
                        .bar {
                            background: #767676;
                            width: $per;
                            height: 100%;
                            @at-root div.on .bar_bg .bar {
                                background: var(--main-color);
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
