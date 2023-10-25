import { useInputLength } from '@hooks/useInput';
import { useState } from 'react';
import onlyNumber from 'utils/onlyNumber';

export default function Deposit({ bankInfo, on }) {
    const [use, setUse] = useState('');

    const checkUse = (num: number) => {
        if (num === 1) {
            setUse('on');
        } else {
            setUse('');
        }
    };

    return (
        <>
            <form ref={bankInfo}>
                <div className={`deposit ${on}`}>
                    <span className="alignCenter">입금자명</span>
                    <input type="text" id="account_name" name="bankbook_name" />
                    <span>계좌번호</span>
                    <p className="account">
                        {process.env.SISTER_HONG_BANK_NAME} {process.env.SISTER_HONG_BANK}
                        <br />
                        <span>주식회사 홍언니고기 푸드</span>
                    </p>
                    <span>현금영수증</span>
                    <div className="receipt">
                        <div>
                            <label className="radioCheckLabel">
                                <input className="radioCheck" type="radio" name="cash_receipt" value="NotNeeded" onChange={() => checkUse(0)} defaultChecked />
                                미발행
                            </label>
                            <label className="radioCheckLabel">
                                <input className="radioCheck" type="radio" name="cash_receipt" value="Requested" onChange={() => checkUse(1)} />
                                발행
                            </label>
                        </div>
                        <div className={`hide ${use}`}>
                            <label className="radioCheckLabel">
                                <input className="radioCheck" type="radio" name="cash_receipt_trade" value="I" defaultChecked />
                                소득공제용
                            </label>
                            <label className="radioCheckLabel">
                                <input className="radioCheck" type="radio" name="cash_receipt_trade" value="E" />
                                지출증빙용
                            </label>
                        </div>
                    </div>
                    <span className={`phone ${use}`}>휴대폰번호 또는 사업자등록번호</span>
                    <div>
                        <input className={`phone ${use}`} type="number" id="account_phone" name="cash_receipt_number" placeholder="-없이 숫자만 입력" {...useInputLength(11, '')} {...onlyNumber()} />
                    </div>
                </div>
            </form>
            <style jsx>{`
                .deposit {
                    display: none;
                    grid-template-columns: 10rem 1fr;
                    background: #f8f8fa;
                    row-gap: 1.2rem;
                    padding: 1rem var(--side-padding-inner) 1.5rem;
                    &.on {
                        display: grid;
                    }
                    > span {
                        font-size: 1.4rem;
                        color: #767676;
                        &.alignCenter {
                            line-height: 3.2rem;
                        }
                    }
                    input[type='text'],
                    input[type='number'] {
                        border-radius: 0;
                        height: 3.2rem;
                        border: 1px solid #a2a2a2;
                        font-size: 1.4rem;
                    }
                    .account {
                        font-size: 1.6rem;
                        font-weight: 500;
                        line-height: 1.2;
                        span {
                            font-size: 1.2rem;
                            font-weight: 400;
                        }
                    }
                    .receipt {
                        > div {
                            display: flex;
                            gap: 1rem;
                            align-items: center;
                            &.hide {
                                display: none;
                                margin-top: 1rem;
                                &.on {
                                    display: flex;
                                }
                            }
                            label {
                                font-size: 1.4rem;
                                font-weight: 400;
                            }
                        }
                    }
                    .phone {
                        display: none;
                        vertical-align: middle;
                        &.on {
                            display: block;
                        }
                        & + div {
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            `}</style>
        </>
    );
}
