import CustomImage from '@components/CustomImage';
import useDonation from '@hooks/store/useDonation';
import usePopToggle from '@hooks/usePopToggle';
import useRenewPayment from '@hooks/useRenewPayment';
import { useRef } from 'react';
import { pointUse } from './CouponPoint/Point';

export default function Donation({ params, setParams }) {
    const { popOn, popOpen, popClose } = usePopToggle();
    const { renewData } = useRenewPayment();
    const { donation_price } = useDonation();
    const donationRef = useRef<HTMLDivElement>(null);

    const handleChange = async () => {
        const donation = (donationRef.current?.querySelector('input[name="donation"]:checked') as HTMLInputElement).value as 'T' | 'F';
        let point_use = pointUse(params.discount.point_use, donation, params, donation_price);

        await renewData({ params, setParams, data: { donation, point_use } });
    };

    return (
        <>
            <div className="fullwd banner">
                <p>
                    홍언니와 함께하는 든든한 동행,
                    <br />
                    <span>동명아동복지센터</span> 후원에 동참하시겠습니까?
                </p>
                <button type="button" onClick={popOpen}>
                    더 알아보기 <span className="arrow"></span>
                </button>
            </div>
            <p className="notice">
                후원참여 시 고객님의 보유적립금에서 차감된 <span>500원</span>은 동명아동복지센터에 기부됩니다.
            </p>
            <div className="fullwd check_area" ref={donationRef}>
                <label className="radioCheckLabel" onChange={handleChange}>
                    <input type="radio" name="donation" value="T" /> 예
                </label>
                <label className="radioCheckLabel" onChange={handleChange}>
                    <input type="radio" name="donation" value="F" /> 아니요
                </label>
            </div>
            <div className={`pop_bg ${popOn}`}>
                <div className="fade">
                    <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/donation_popup.png`} width={600} height={989} alt="동명아동복지센터 후원" />
                    <button type="button" className="close" onClick={popClose}>
                        <span className="hidden">닫기</span>
                    </button>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .banner {
                    background: linear-gradient(to right, #5faedd, transparent);
                    padding: 1rem var(--side-padding);
                    p {
                        font-size: 1.8rem;
                        font-weight: 500;
                        span {
                            color: #fff;
                            font-weight: 700;
                            vertical-align: baseline;
                        }
                    }
                    button {
                        margin-top: 0.5rem;
                        display: flex;
                        align-items: center;
                        margin-left: auto;
                        color: #767676;
                        font-size: 1.2rem;
                        font-weight: 500;
                        .arrow {
                            display: block;
                            position: relative;
                            width: 1rem;
                            height: 1rem;
                            @include mixins.arrow(0.6rem, 0.1rem, 45deg, right, #767676);
                        }
                    }
                }
                .notice {
                    font-size: 1rem;
                    margin-top: 0.7rem;
                    padding: 0 var(--side-padding);
                    span {
                        color: #000;
                        font-weight: 700;
                        vertical-align: baseline;
                    }
                }
                .check_area {
                    display: flex;
                    gap: 3rem;
                    padding: 1rem var(--side-padding) 1.5rem;
                    label {
                        display: flex;
                        font-size: 1.4rem;
                        input {
                            &:checked {
                                &:before {
                                    background: #5faedd;
                                    box-shadow: 0 0 0 1px #5faedd;
                                }
                            }
                        }
                    }
                }
                .pop_bg {
                    .fade {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 90%;
                        transform: translate(-50%, -55%);
                        .close {
                            @include mixins.closeBtn(2.5rem, 0.2rem, #000);
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
