import { useInputVal, useInputLength } from '@hooks/useInput';
import { useRef, useState } from 'react';
import onlyNumber from 'utils/onlyNumber';
import Adress from './Adress';
import { shipInfo } from '../DestinationInfo';
import sendAxios from 'utils/sendAxios';
import { addrData } from './AddrList';

interface form {
    user_name: string;
    phone: string;
    zipcode: string;
    address: string;
    detailed_address: string;
    shipping?: number;
    default_address: string;
}

export default function ModifyPop({ popOn, setPopOn, setLists, handleAddr, setSelectedNum, length }) {
    const [address, setAddress] = useState({ zonecode: popOn.data.zipcode, addr: popOn.data.address, detailAddr: popOn.data.detailed_address });
    const [loading, setLoading] = useState(false);
    const nameRef = useRef<HTMLInputElement>();
    const phoneRef = useRef<HTMLDivElement>();
    const locationRef = useRef<HTMLLIElement>();
    const locRef = useRef<HTMLInputElement>();
    const [resetPost, setResetPost] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const name = nameRef.current.value;
        let data: form = { user_name: '', address: '', detailed_address: '', zipcode: '', phone: '', default_address: 'N' };

        if (!name) {
            alert('수령인을 입력하여주세요.');
            setLoading(false);
            return;
        }

        const phoneInput = phoneRef.current.querySelectorAll('input');
        for (const obj of Array.from(phoneInput)) {
            data.phone += obj.value;
        }
        if (data.phone.length < 9) {
            alert('연락처를 확인하여주세요.');
            setLoading(false);
            return;
        }

        const addrInput = locationRef.current.querySelectorAll('input');
        for (const obj of Array.from(addrInput)) {
            if (!obj.value) {
                alert('주소를 입력하여주세요.');
                setLoading(false);
                return;
            }

            const key = obj.dataset.type;

            data[key] = obj.value;
        }

        if (name.length > 15) {
            alert('수령인은 15자이내 한글, 영문만 가능합니다.');
            setLoading(false);
            return;
        }

        data.user_name = name;
        data.default_address = locRef.current.checked === true ? 'Y' : 'N';

        if (popOn.data.shipping !== null) {
            data.shipping = popOn.data.shipping;
        }

        await submit(data, locRef.current.checked);
        setLoading(false);
    };

    const submit = async (data: form, defLoc: boolean) => {
        const config = { method: 'post', url: `${process.env.API_HOST}/auth/set-user-address`, data };
        const success = async (res) => {
            const type = data.shipping ? 'modify' : 'add';
            const resData = res.data;
            const shipping = resData.shipping;

            if (type === 'add') {
                setLists((prev: shipInfo[]) => [resData, ...prev]);
            } else {
                setLists((prev: shipInfo[]) =>
                    prev.map((obj) => {
                        if (obj.shipping === shipping) {
                            return resData;
                        }
                        return obj;
                    })
                );
            }

            if (defLoc) {
                await handleAddr(shipping, setLists);
            }

            setSelectedNum((prev) => ({ prev: prev.current, current: shipping }));
            handleClose();
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    const handleClose = () => {
        setPopOn({ on: '', data: addrData });
    };

    return (
        <>
            <div className={`fullwd ${popOn.on} modifyPop`}>
                <form onSubmit={handleSubmit}>
                    <div className="box">
                        <h2>
                            배송지 추가 <span className="close" onClick={handleClose}></span>
                        </h2>
                        <div className="info">
                            <ul>
                                <li>
                                    <h3>수령인</h3>
                                    <input type="text" placeholder="15자 이내의 한글, 영문만 입력가능합니다." ref={nameRef} {...useInputVal(popOn.data.user_name)} />
                                </li>
                                <li className="phone">
                                    <h3>연락처</h3>
                                    <div ref={phoneRef}>
                                        <input type="number" placeholder="010" {...onlyNumber()} {...useInputLength(3, popOn.data.phone.slice(0, 3))} />
                                        <span>-</span>
                                        <input type="number" placeholder="0000" {...onlyNumber()} {...useInputLength(4, popOn.data.phone.slice(3, 7))} />
                                        <span>-</span>
                                        <input type="number" placeholder="0000" {...onlyNumber()} {...useInputLength(4, popOn.data.phone.slice(-4))} />
                                    </div>
                                </li>
                                <li className="location" ref={locationRef}>
                                    <h3>배송지</h3>
                                    <Adress key={resetPost} address={address} setAddress={setAddress} setResetPost={setResetPost} />
                                </li>
                            </ul>
                        </div>
                        <div className="defaultLoc">
                            <label className="radioCheckLabel">
                                <input type="checkbox" className="radioCheck" ref={locRef} defaultChecked={!length ? true : popOn.data.default_address === 'Y'} disabled={!length ? true : popOn.data.default_address === 'Y'} /> 기본배송지로 설정
                            </label>
                        </div>
                        <div>
                            <button type="submit" className="commonButton typeRed" disabled={loading}>
                                입력완료
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <style jsx global>{`
                .modifyPop {
                    input[type='text'],
                    input[type='number'] {
                        border-radius: 0 !important;
                        height: 4rem !important;
                        font-size: 1.6rem !important;
                    }
                }
            `}</style>
            <style jsx>{`
                @use 'styles/mixins';
                .fullwd {
                    display: none;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    height: 100%;
                    background: #fff;
                    z-index: 10;
                    h2 {
                        .close {
                            @include mixins.closeBtn(2.5rem, 0.25rem, #a2a2a2);
                        }
                    }
                    .info {
                        padding: 1.5rem 0;
                        li {
                            margin-bottom: 1.5rem;
                            padding: 0 var(--side-padding-inner);
                            &:last-child {
                                margin-bottom: 0;
                            }
                            h3 {
                                font-size: 1.6rem;
                                margin-bottom: 0.7rem;
                                font-weight: normal;
                                color: #707070;
                            }
                            &.phone div {
                                display: flex;
                                align-items: center;
                                column-gap: 0.5rem;
                                input {
                                    text-align: center;
                                    padding-left: 0;
                                }
                            }
                            &.location {
                                padding: 0;
                                h3 {
                                    padding: 0 var(--side-padding-inner);
                                }
                            }
                        }
                    }
                    .defaultLoc {
                        padding-top: 0;
                        padding-bottom: 0;
                        label {
                            font-size: 1.4rem;
                            font-weight: 500;
                            color: #707070;
                            cursor: pointer;
                            input:disabled {
                                &:before {
                                    background: var(--main-color);
                                    border-color: #fff;
                                    box-shadow: 0 0 0 1px var(--main-color);
                                }
                            }
                        }
                    }
                    &.on {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}
