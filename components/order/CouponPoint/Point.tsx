import useDonation from '@hooks/store/useDonation';
import useRenewPayment from '@hooks/useRenewPayment';
import { ChangeEvent, useEffect, useState } from 'react';
import convertPrice from 'utils/convertPrice';

interface point_params {
    user: { point: number };
    discount: { point_use: number };
}

export const pointUse = (point: number, donation: 'T' | 'F', params: point_params, donation_price: number) => {
    if (point !== 0 && params.user.point < 2000 && donation === 'F') {
        alert('적립금은 2,000원 이상 보유 시 사용 가능합니다.');
        useDonation.setState({ donation, changed_point: 0 });
        return 0;
    }

    const user_point = params.user.point;
    let changed_point = point;

    if (changed_point !== 0 && donation === 'T') {
        if (changed_point >= user_point - donation_price) {
            changed_point = user_point < donation_price ? 0 : user_point - donation_price;
        } else {
            changed_point = changed_point < donation_price ? 0 : changed_point;
        }
    } else if (changed_point !== 0 && donation === 'F') {
        changed_point = point;
    }

    useDonation.setState({ donation, changed_point });
    return changed_point;
};

export default function Point({ point, params, setParams }) {
    const [usePoint, setUsePoint] = useState<number | string>('0');
    const [result, setResult] = useState(null);
    const { loading, renewData } = useRenewPayment();
    const useable = params.discount.point_available;
    const { donation, changed_point, donation_price } = useDonation();
    let point_limit = params.discount.point_limit >= point ? point : params.discount.point_limit;

    const initPoint = () => {
        setUsePoint('0');
        setResult(null);
        useDonation.setState({ changed_point: 0 });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const val = +value.replace(/[^0-9]/g, '');
        const point_val = val > point_limit ? point_limit : val;

        setUsePoint(convertPrice(point_val));
    };

    const handleSubmit = async (e: React.FormEvent = null, pointAll: string = null) => {
        if (e) {
            e.preventDefault();
        }

        const original_point = pointAll ? pointAll : usePoint;
        const point_use = pointUse(+convertPrice(original_point), donation as 'T' | 'F', params, donation_price);

        const success = (res) => {
            if (res.discount.point_use === 0) {
                initPoint();
                return;
            }
            setUsePoint(convertPrice(res.discount.point_use));
            setResult(convertPrice(res.discount.point_use));
        };
        const fail = async () => {
            initPoint();
        };
        await renewData({ params, setParams, data: { point_use: point_use, donation }, success, fail });
    };

    const useAll = async () => {
        handleSubmit(null, convertPrice(point_limit));
    };

    useEffect(() => {
        let point = changed_point;

        if (point !== 0) {
            setUsePoint(convertPrice(changed_point));
            setResult(convertPrice(changed_point));
        } else {
            initPoint();
        }
    }, [donation]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="wrap">
                    <input type="text" value={usePoint} onChange={handleChange} />
                    <button type="submit" className="commonButton typeRed" disabled={loading || !useable}>
                        적립금적용
                    </button>
                    {!useable && <p className="discount">적립금 적용이 불가한 상품입니다</p>}
                    {result !== null && (
                        <p className="discount">
                            사용금액 : <span>{result}원</span>
                        </p>
                    )}
                </div>
            </form>
            <div className="notice">
                <p className="discount">
                    <span>보유적립금 : {convertPrice(point)}원</span>
                    <button type="button" onClick={useAll} disabled={loading || !useable}>
                        최대금액사용
                    </button>
                </p>
                <p className="text">2,000원 이상 적립금 보유 및 30,000원 이상 구매 시 최대 30% 사용가능</p>
            </div>
            <style jsx>{`
                .wrap {
                    display: flex;
                    flex-wrap: wrap;
                    column-gap: 1rem;
                    margin-bottom: 0.5rem;
                    input {
                        flex-basis: 0;
                        flex-grow: 1;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                    }
                    button {
                        flex-basis: 8rem;
                        height: 4rem;
                        border-radius: 0;
                        font-size: 1.4rem;
                        padding: 0;
                    }
                }
                .notice {
                    .discount {
                        button {
                            margin-left: 0.5rem;
                            font-size: 1.4rem;
                            vertical-align: text-top;
                            text-decoration: underline;
                        }
                    }
                    .text {
                        padding-left: 1rem;
                        color: #707070;
                        font-size: 1.2rem;
                        span {
                            vertical-align: baseline;
                        }
                    }
                }
            `}</style>
        </>
    );
}
