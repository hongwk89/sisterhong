import useRenewPayment from '@hooks/useRenewPayment';
import React, { ChangeEvent, useState, useRef } from 'react';
import convertPrice from 'utils/convertPrice';
import sendAxios from 'utils/sendAxios';

export default function CouponCode({ params, setParams }) {
    const [code, setCode] = useState('쿠폰코드를 입력해주세요.');
    const { loading, renewData } = useRenewPayment();
    const inputRef = useRef<HTMLInputElement>();
    const [result, setResult] = useState(null);

    const handleFocus = () => {
        setCode('');
        inputRef.current.classList.add('on');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/coupon/add`,
            data: { serial_coupon: code }
        };

        const result = await sendAxios({ config });

        if (result.state === 'fail') {
            await renewData({ params, setParams, data: { serial_coupon: '' } });
            alert(result.data.message);
            initInput();
            return;
        }

        const success = (res) => {
            setResult(res.coupons.serial_coupon.coupon_discount);
        };
        const fail = async (err) => {
            await renewData({ params, setParams, data: { serial_coupon: '' } });
            initInput();
        };

        await renewData({ params, setParams, data: { serial_coupon: code }, success, fail });
    };

    const initInput = () => {
        params.serial_coupon = '';
        inputRef.current.classList.remove('on');
        setResult(null);
    };

    const cancelCode = async () => {
        await renewData({ params, setParams, data: { serial_coupon: '' } });
        setResult(null);
        setCode('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={code} placeholder="쿠폰코드를 입력해주세요" onFocus={handleFocus} onChange={handleChange} ref={inputRef} />
                    <button type="submit" className="commonButton typeRed" disabled={loading}>
                        쿠폰적용
                    </button>
                    {result && (
                        <p className="discount">
                            할인금액 : <span>{convertPrice(result)}원</span>
                            <button type="button" onClick={cancelCode}>
                                쿠폰코드미적용
                            </button>
                        </p>
                    )}
                </div>
            </form>
            <style jsx>{`
                div {
                    display: flex;
                    flex-wrap: wrap;
                    column-gap: 1rem;
                    margin-bottom: 1.5rem;
                    input {
                        flex-basis: 0;
                        flex-grow: 1;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                        color: #a2a2a2;
                        &.on {
                            font-weight: 500;
                            color: #000;
                        }
                    }
                    > button {
                        flex-basis: 8rem;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                    }
                    .discount {
                        display: flex;
                        align-items: center;
                        button {
                            font-size: 1.4rem;
                            margin-left: 0.5rem;
                            text-decoration: underline;
                        }
                    }
                }
            `}</style>
        </>
    );
}
