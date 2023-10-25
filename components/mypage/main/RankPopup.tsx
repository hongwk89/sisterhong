import { Fragment, useEffect, useState } from 'react';
import convertPrice from 'utils/convertPrice';

export default function RankPopup({ data, rankColor, popOn, popClose }) {
    const percent = 100 - Math.round((data.payment_price / data.range[data.next_membership].boundary) * 100);
    const [progress, setProcess] = useState(100);

    const remain = data.range[data.next_membership].boundary - data.payment_price < 0 ? 0 : data.range[data.next_membership].boundary - data.payment_price;

    useEffect(() => {
        if (popOn === 'on') {
            setProcess(percent < 0 ? 0 : percent);
        } else {
            setProcess(100);
        }
    }, [popOn]);

    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className="popup fade">
                    <h1>
                        등급안내
                        <button type="button" className="close" onClick={popClose}>
                            <span className="hidden">닫기</span>
                        </button>
                    </h1>
                    <div className="content">
                        <div className="top">
                            <span className={`rank ${data.membership}`}>{data.membership.toUpperCase()}</span>
                            <p>
                                결제금액의 <span className={`${data.membership}`}>{data.range[data.membership].ratio}</span> 적립
                            </p>
                        </div>
                        <div className={`mid_bar ${data.membership}_bg`}>
                            <p>
                                {data.membership === 'family' ? (
                                    <>환영합니다 고객님.</>
                                ) : (
                                    <>
                                        고객님의 등급유효기간은 <span>{data.level_ends}</span>까지 입니다.
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="bot">
                            <div className="destination">
                                {data.membership === 'vip' ? <p>등급유지를 위한 결제금액 달성도</p> : <p>다음 등급으로 상향하기 위한 결제금액 달성도</p>}

                                <p>
                                    <span>{convertPrice(data.payment_price)}원 </span>
                                    <span>/ {convertPrice(remain)}원 남음</span>
                                </p>
                                <div className="bar_area">
                                    <div className="bar_bg">
                                        <svg width="100%" height="1rem" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path fill="none" stroke="#E8E8E8" strokeWidth="20" d="M0,0H100"></path>
                                            <path className="fill_bar" stroke={rankColor[data.next_membership]} fill="none" strokeWidth="20" d="M0,0H100" strokeDasharray="100" strokeDashoffset={`${progress}`}></path>
                                        </svg>
                                    </div>
                                    <p>목표 : {convertPrice(data.range[data.next_membership].boundary)}원</p>
                                </div>
                            </div>
                            <div className="rank_info">
                                <h3>등급별 혜택</h3>
                                <div className="table">
                                    <span className="head">등급</span>
                                    <span className="head">결제금액</span>
                                    <span className="head">혜택</span>
                                    {Object.keys(data.range).map((key, idx) => (
                                        <Fragment key={idx}>
                                            <span className={`${key}_bg ${key}`}>{key.toUpperCase()}</span>
                                            <span className={`${key}_bg`}>{data.range[key].boundary === 0 ? '-' : convertPrice(data.range[key].boundary) + '원 이상'}</span>
                                            <span className={`${key}_bg saving`}>
                                                {key !== 'family' && <span className="up">10,000원 이상 구매 시</span>}
                                                <span className="down">
                                                    <span className={key}>{data.range[key].ratio}</span> 적립
                                                </span>
                                            </span>
                                        </Fragment>
                                    ))}
                                </div>
                                <p>
                                    ※ 이전 3개월 결제금액 합산으로 당월 등급이 산정됩니다.
                                    <br />※ 회원등급은 매월 1일에 변경됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                $progress: ${progress};
                $family: ${rankColor.family};
                $silver: ${rankColor.silver};
                $gold: ${rankColor.gold};
                $vip: ${rankColor.vip};
                .pop_bg {
                    .popup {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 95%;
                        transform: translate(-50%, -55%);
                        background: #fff;
                        h1 {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 1.8rem;
                            color: #000;
                            font-weight: 500;
                            height: 4.5rem;
                            line-height: 4.5rem;
                            padding: 0 var(--side-padding);
                            background: #f8f8fa;
                            .close {
                                @include mixins.closeBtn(2.3rem, 0.2rem, #a2a2a2);
                            }
                        }
                        .content {
                            .family {
                                color: $family;
                            }
                            .silver {
                                color: $silver;
                            }
                            .gold {
                                color: $gold;
                            }
                            .vip {
                                color: $vip;
                            }
                            .family_bg {
                                background: $family;
                            }
                            .silver_bg {
                                background: $silver;
                            }
                            .gold_bg {
                                background: $gold;
                            }
                            .vip_bg {
                                background: $vip;
                            }
                            .top {
                                padding: 1.5rem var(--side-padding);
                                .rank {
                                    font-size: 3rem;
                                    font-weight: bold;
                                    font-family: 'roboto';
                                }
                                p {
                                    font-size: 1.8rem;
                                    color: #000;
                                    span {
                                        vertical-align: baseline;
                                        font-weight: 700;
                                    }
                                }
                            }
                            .mid_bar {
                                p {
                                    height: 4rem;
                                    line-height: 4rem;
                                    padding: 0 var(--side-padding);
                                    color: #fff;
                                    font-size: 1.4rem;
                                    span {
                                        font-weight: bold;
                                        color: #fff;
                                        vertical-align: baseline;
                                    }
                                }
                            }
                            .bot {
                                padding: 2rem var(--side-padding);
                                .destination {
                                    > p {
                                        &:first-child {
                                            font-size: 1.4rem;
                                            color: #000;
                                        }
                                        &:nth-child(2) {
                                            display: flex;
                                            align-items: baseline;
                                            margin-top: 0.5rem;
                                            span {
                                                &:first-child {
                                                    font-size: 1.6rem;
                                                    color: #000;
                                                    font-weight: 500;
                                                }
                                                &:last-child {
                                                    font-size: 1.2rem;
                                                    color: #777;
                                                    margin-left: 0.2rem;
                                                }
                                            }
                                        }
                                    }
                                    .bar_area {
                                        margin-top: 0.5rem;
                                        .bar_bg {
                                            svg {
                                                display: block;
                                                .fill_bar {
                                                    animation: fill 2s cubic-bezier(0.25, 1, 0.5, 1);
                                                }
                                                @keyframes fill {
                                                    0% {
                                                        stroke-dashoffset: 100;
                                                    }
                                                    20% {
                                                        stroke-dashoffset: 100;
                                                    }
                                                    100% {
                                                        stroke-dashoffset: $progress;
                                                    }
                                                }
                                            }
                                        }
                                        p {
                                            text-align: right;
                                            margin-top: 0.2rem;
                                            color: #707070;
                                            font-size: 1.2rem;
                                        }
                                    }
                                }
                                .rank_info {
                                    margin-top: 1rem;
                                    h3 {
                                        font-size: 1.8rem;
                                        font-weight: 500;
                                    }
                                    .table {
                                        display: grid;
                                        grid-template-columns: 1fr 1fr 1fr;
                                        margin-top: 0.5rem;
                                        border: 0.1rem solid #a2a2a2;
                                        > span {
                                            font-size: 1.3rem;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            height: 3.5rem;
                                            &:not(.head, .vip_bg) {
                                                border-bottom: 0.1rem dotted #a2a2a2;
                                            }
                                            &.head {
                                                border-bottom: 0.1rem solid #a2a2a2;
                                            }
                                            &:nth-of-type(3n + 2) {
                                                border-left: 0.1rem solid #707070;
                                                border-right: 0.1rem solid #707070;
                                            }
                                            &:nth-of-type(3n + 4) {
                                                font-weight: 700;
                                                font-size: 1.6rem;
                                                font-family: 'roboto';
                                            }
                                            &.family_bg {
                                                background: rgba(86, 174, 51, 0.1);
                                            }
                                            &.silver_bg {
                                                background: rgba(112, 112, 112, 0.1);
                                            }
                                            &.gold_bg {
                                                background: rgba(233, 176, 3, 0.1);
                                            }
                                            &.vip_bg {
                                                background: rgba(205, 35, 34, 0.1);
                                            }
                                            &.saving {
                                                display: flex;
                                                flex-direction: column;
                                                justify-content: center;
                                                text-align: center;
                                                > * {
                                                    line-height: 1.2;
                                                }
                                                .up {
                                                    color: #aaa;
                                                    font-size: 1rem;
                                                }
                                                .down {
                                                    font-weight: 700;
                                                    font-size: 1.2rem;
                                                    display: inline-flex;
                                                    align-items: center;
                                                    gap: 0.3rem;
                                                }
                                            }
                                        }
                                    }
                                    p {
                                        text-align: right;
                                        color: #a2a2a2;
                                        margin-top: 0.5rem;
                                    }
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
