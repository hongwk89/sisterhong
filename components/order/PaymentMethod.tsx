import { useState } from 'react';
import Deposit from './Deposit';

interface pay_method {
    sort: 'card' | 'virtual_account' | 'account_transfer' | 'bank_transfer';
    name: '카드' | '가상계좌' | '계좌이체' | '무통장입금';
}

export default function PaymentMethod({ setType, bankInfo }) {
    const [on, setOn] = useState('');

    const handleChange = (data: pay_method) => {
        setType(data);

        if (data.name === '무통장입금') {
            setOn('on');
            return;
        }

        setOn('');
    };

    return (
        <>
            <div className="fullwd">
                <div className="radio">
                    <label className="radioCheckLabel">
                        <input type="radio" name="payment" defaultChecked onChange={() => handleChange({ sort: 'card', name: '카드' })} />
                        카드결제
                    </label>
                    {/* <label className="radioCheckLabel">
                        <input type="radio" name="payment" onChange={() => handleChange({ sort: 'bank_transfer', name: '무통장입금' })} />
                        무통장입금
                    </label> */}
                    <label className="radioCheckLabel">
                        <input type="radio" name="payment" onChange={() => handleChange({ sort: 'account_transfer', name: '계좌이체' })} />
                        계좌이체
                    </label>
                    <label className="radioCheckLabel">
                        <input type="radio" name="payment" onChange={() => handleChange({ sort: 'virtual_account', name: '가상계좌' })} />
                        가상계좌
                    </label>
                </div>
                {<Deposit bankInfo={bankInfo} on={on} />}
            </div>
            <style jsx>{`
                .radio {
                    display: flex;
                    justify-content: space-evenly;
                    padding: 1rem 0;
                    label {
                        font-size: 1.6rem;
                    }
                }
            `}</style>
        </>
    );
}
