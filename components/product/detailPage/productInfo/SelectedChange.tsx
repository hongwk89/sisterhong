import React, { ChangeEvent, useEffect, useState } from 'react';

export default function SelectedChange({ initAmount, limit, eventLimit, updateOption = null, type = 'detailPage', soldOut = null, reset = null }) {
    const [amount, setAmount] = useState<number | string>(initAmount);

    const handleAdd = () => {
        const amt = typeof amount === 'string' ? +amount : amount;
        updateAmount(amt + 1);
    };

    const handleSub = () => {
        if (amount > 1) {
            const amt = typeof amount === 'string' ? +amount : amount;
            updateAmount(amt - 1);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '');

        updateAmount(+val);
    };

    const handleFocus = () => {
        setAmount('');
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value === '' || value === '0') {
            updateAmount(1);
            return;
        }

        updateAmount(+value);
    };

    const updateAmount = (num: number) => {
        const smaller = eventLimit > limit ? 'limit' : 'eventLimit';
        let amt = num;

        if (smaller === 'limit') {
            if (limit < num) {
                alert(`해당 상품의 남아있는 재고는 ${limit}개 입니다.`);
                amt = limit;
            }
        }

        if (smaller === 'eventLimit') {
            if (eventLimit < num) {
                amt = eventLimit;
            }
        }

        setAmount(amt);
    };

    useEffect(() => {
        if (updateOption !== null) {
            updateOption(amount);
        }
    }, [amount]);

    useEffect(() => {
        setAmount(initAmount);
    }, [initAmount, reset]);

    return (
        <>
            <div className={`buttons ${type}`}>
                <button type="button" className="sub" onClick={handleSub} disabled={soldOut ? true : false}></button>
                <input type="text" name="amount" value={amount} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></input>
                <button type="button" className="add" onClick={handleAdd} disabled={soldOut ? true : false}></button>
            </div>
            <style jsx>{`
                @mixin bar($color: #191919, $rotate: 0deg, $wd: 1.5rem, $ht: 0.3rem) {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: $wd;
                    height: $ht;
                    background: $color;
                    transform: translate(-50%, -50%) rotate($rotate);
                }
                .buttons {
                    margin-left: auto;
                    display: flex;
                    &.detailPage {
                        button {
                            position: relative;
                            background: #e8e8e8;
                            width: 4rem;
                            height: 4rem;
                            font-size: 3rem;
                            font-weight: 700;
                            line-height: 1;
                            &.sub {
                                &:before {
                                    @include bar;
                                }
                            }
                            &.add {
                                &:before {
                                    @include bar;
                                }
                                &:after {
                                    @include bar(#191919, 90deg);
                                }
                            }
                        }
                        input {
                            width: 6rem;
                            height: 4rem;
                            font-size: 2rem;
                            font-family: 'roboto';
                            border-radius: 0;
                            text-align: center;
                            padding-left: 0;
                        }
                    }
                    &.cart {
                        button {
                            position: relative;
                            background: #eee;
                            width: 2.5rem;
                            height: 2.5rem;
                            font-size: 2rem;
                            font-weight: 700;
                            line-height: 1;
                            &.sub {
                                &:before {
                                    @include bar(#707070, 0deg, 1.2rem, $ht: 0.2rem);
                                }
                            }
                            &.add {
                                &:before {
                                    @include bar(#707070, 0deg, 1.2rem, $ht: 0.2rem);
                                }
                                &:after {
                                    @include bar(#707070, 90deg, 1.2rem, $ht: 0.2rem);
                                }
                            }
                        }
                        input {
                            width: 3.5rem;
                            height: 2.5rem;
                            font-size: 1.6rem;
                            font-family: 'roboto';
                            border-radius: 0;
                            text-align: center;
                            padding-left: 0;
                            font-weight: 500;
                            border-color: #eee;
                        }
                    }
                }
            `}</style>
        </>
    );
}
