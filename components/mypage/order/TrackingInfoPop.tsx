import CustomImage from '@components/CustomImage';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

interface tracking {
    where: string;
    kind: string;
    timeString: string;
}

export default function TrackingInfoPop({ track, popOn, popClose }) {
    const [currentInfo, setCurrentInfo] = useState({ parcel_company: null, parcel_id: null, orderStatus: null, trackingDetails: null });
    const [num, setNum] = useState(0);

    const changeDate = async (idx: number) => {
        const config = { method: 'get', url: `${process.env.API_HOST}/parcel/service`, params: { t_code: track[idx].parcel_company_code, t_invoice: track[idx].tracking_number } };
        const success = (res) => {
            setNum(idx);
            setCurrentInfo({ parcel_company: res.parcel_company, parcel_id: res.tracking_number, orderStatus: res.status, trackingDetails: JSON.parse(res.tracking_info.parcel_info).trackingDetails });
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    useEffect(() => {
        if (track !== null) {
            setCurrentInfo({ parcel_company: track[0].parcel_company, parcel_id: track[0].tracking_number, orderStatus: track[0].status, trackingDetails: JSON.parse(track[0].tracking_info.parcel_info).trackingDetails });
        }
    }, [track]);

    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className={`trackingInfoPop fade`}>
                    <h1>
                        배송조회
                        <button type="button" className="close" onClick={popClose}>
                            <span className="hidden">닫기</span>
                        </button>
                    </h1>
                    <div className="content">
                        <div className="top">
                            <p>{currentInfo.parcel_company}</p>
                            <p>운송장번호</p>
                            <p>{currentInfo.parcel_id}</p>
                        </div>
                        <ul className="mid">
                            <li className={`${currentInfo.orderStatus === 300 ? 'on' : ''}`}>
                                <div className="icon">
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/track/prepare.png`} width={70} height={70} alt="출고완료" />
                                    </span>
                                </div>
                                <span className="text">출고완료</span>
                            </li>
                            <li className="arrow">
                                <span></span>
                            </li>
                            <li className={`${currentInfo.orderStatus === 400 ? 'on' : ''}`}>
                                <div className="icon">
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/track/delivery.png`} width={70} height={70} alt="배송중" />
                                    </span>
                                </div>
                                <span className="text">배송중</span>
                            </li>
                            <li className="arrow">
                                <span></span>
                            </li>
                            <li className={`${currentInfo.orderStatus === 500 ? 'on' : ''}`}>
                                <div className="icon">
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/track/complete.png`} width={70} height={70} alt="배송완료" />
                                    </span>
                                </div>
                                <span className="text">배송완료</span>
                            </li>
                        </ul>
                        <div className="bot">
                            {currentInfo.trackingDetails?.length > 0 ? (
                                <ul>
                                    {currentInfo.trackingDetails.reverse().map((list: tracking, idx: number) => (
                                        <li key={idx} className={`${idx === 0 ? 'on' : ''}`}>
                                            {list.where}
                                            <span>{list.kind}</span>
                                            <p>{list.timeString}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="empty">운송장은 발급되었으나 택배사픽업 전입니다.</p>
                            )}
                        </div>
                        {track?.length > 1 && (
                            <ul className="pages">
                                {track.map((list, idx: number) => (
                                    <li key={idx} className={`${num === idx ? 'on' : ''}`} onClick={() => changeDate(idx)}>
                                        {idx + 1}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .trackingInfoPop {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -55%);
                    width: 100%;
                    background: #fff;
                    h1 {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                        background: #f8f8fa;
                        height: 4.6rem;
                        font-size: 1.8rem;
                        font-weight: 500;
                        padding: 0 var(--side-padding-inner);
                        .close {
                            position: relative;
                            @include mixins.closeBtn(2.5rem, 0.2rem, #a2a2a2);
                        }
                    }
                    .content {
                        padding: 0 var(--side-padding-inner) 2rem;
                        .top {
                            padding: 2rem 0;
                            p {
                                font-size: 1.8rem;
                                text-align: center;

                                &:first-child {
                                    color: var(--main-color);
                                    font-weight: 500;
                                    font-size: 1.4rem;
                                }
                                &:nth-child(2) {
                                    margin: 0.5rem 0;
                                    color: #707070;
                                    font-weight: 500;
                                }
                                &:last-child {
                                    font-weight: 700;
                                }
                            }
                        }
                        .mid {
                            display: flex;
                            justify-content: space-between;
                            li {
                                &.arrow {
                                    position: relative;
                                    span {
                                        @include mixins.arrow(0.8rem, 0.1rem, 45deg, right, #707070);
                                        position: absolute;
                                        top: 3.5rem;
                                    }
                                }
                                &:not(.arrow) {
                                    .icon {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        width: 7rem;
                                        height: 7rem;
                                        border-radius: 50%;
                                        background: #f8f8fa;
                                        .image {
                                            position: relative;
                                            display: block;
                                            height: 3.5rem;
                                            width: 3.5rem;
                                            filter: opacity(50%);
                                        }
                                    }
                                    .text {
                                        font-size: 1.6rem;
                                        color: #707070;
                                        margin-top: 0.7rem;
                                        display: block;
                                        text-align: center;
                                    }
                                }
                                &.on {
                                    .icon {
                                        background: var(--main-color);
                                        .image {
                                            filter: invert(1);
                                        }
                                    }
                                    .text {
                                        color: var(--main-color);
                                        font-weight: 700;
                                    }
                                }
                            }
                        }
                        .bot {
                            margin-top: 2rem;
                            padding: 2rem 0;
                            background: #f8f8fa;
                            max-height: 20rem;
                            overflow-y: auto;
                            ul {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                gap: 2rem;
                                padding: 0.5rem 0;
                                &:before {
                                    content: '';
                                    position: absolute;
                                    top: 50%;
                                    left: 2.2rem;
                                    transform: translate(-50%, -50%);
                                    background: #e8e8e8;
                                    width: 0.4rem;
                                    height: 100%;
                                }
                                li {
                                    position: relative;
                                    font-size: 1.4rem;
                                    font-weight: 500;
                                    color: #000000;
                                    padding-left: 4rem;
                                    &:before {
                                        content: '';
                                        position: absolute;
                                        top: 0.3rem;
                                        left: 1.6rem;
                                        display: block;
                                        width: 1.1rem;
                                        height: 1.1rem;
                                        border-radius: 50%;
                                        background: #fff;
                                        border: 0.1rem solid #a2a2a2;
                                    }
                                    &.on {
                                        span {
                                            color: var(--main-color);
                                        }
                                        &:before {
                                            background: #a2a2a2;
                                        }
                                    }
                                    span {
                                        vertical-align: baseline;
                                        color: #767676;
                                        margin-left: 1rem;
                                    }
                                    p {
                                        color: #a2a2a2;
                                        font-size: 1.2rem;
                                        margin-top: 0.2rem;
                                    }
                                }
                            }
                            .empty {
                                text-align: center;
                                padding: 0;
                                font-size: 1.4rem;
                            }
                        }
                    }
                    .pages {
                        margin-top: 1rem;
                        display: flex;
                        justify-content: right;
                        gap: 0.8rem;
                        li {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 1.8rem;
                            height: 1.8rem;
                            background: #e8e8e8;
                            color: #a2a2a2;
                            border-radius: 50%;
                            cursor: pointer;
                            line-height: 0;
                            &.on {
                                background: var(--main-color);
                                color: #fff;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
