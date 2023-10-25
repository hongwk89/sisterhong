import usePopToggle from '@hooks/usePopToggle';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import toPhoneForm from 'utils/toPhoneForm';
import OrderListPop from './popup/AddrList';

export interface shipInfo {
    shipping: number;
    user_name: string;
    phone: string;
    zipcode: string;
    address: string;
    detailed_address: string;
    default_address: string;
}

const emptyData: shipInfo = { shipping: null, user_name: '-', phone: '-', zipcode: '-', address: '-', detailed_address: '-', default_address: '-' };

export default function DestinationInfo({ data, params, setParams }) {
    const [info, setInfo] = useState<shipInfo>(() => {
        if (data.addr_idx === 0) {
            return emptyData;
        } else {
            return data;
        }
    });
    const [value, setValue] = useState('부재시 문앞에 놓아주세요.');
    const [selectBoxOn, setSelectBoxOn] = useState(false);
    const { popOn, popOpen, popClose } = usePopToggle();
    const [addr, setAddr] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    const textarea = useRef<HTMLTextAreaElement>();
    const memo = useRef<HTMLInputElement>();

    const handleChange = (e: ChangeEvent) => {
        const val = (e.target as HTMLSelectElement).value;

        setValue(val);
    };

    const handleClick = () => {
        setSelectBoxOn((prev) => !prev);
    };

    const selectBox = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const text = target.innerText;
        const dataset = target.dataset.type;

        if (dataset === 'direct') {
            setValue('');
            setReadOnly(false);
        } else {
            setValue(text);
            setReadOnly(true);
        }
        handleClick();
    };

    useEffect(() => {
        const getAddrList = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/auth/user-address/list` };

            const result = await sendAxios({ config });

            if (result.state === 'fail') {
                console.log(result.data.message);
                return;
            }

            setAddr(result);
        };

        getAddrList();
    }, []);

    useEffect(() => {
        if (!readOnly) {
            new Promise<void>((resolve) => {
                resolve();
            }).then(() => {
                memo.current.focus();
            });
        }
    }, [readOnly]);

    useEffect(() => {
        textarea.current.style.height = '0';
        textarea.current.style.height = textarea.current.scrollHeight.toString() + 'px';
    }, [info]);

    return (
        <>
            <div className="wrap">
                <button type="button" className="change_addr" onClick={popOpen}>
                    배송지 변경
                </button>
                <span className="key">수령인</span>
                <input className="val" data-type="receiver_name" value={info.user_name} readOnly tabIndex={-1} />
                <span className="key">연락처</span>
                <input className="val" data-type="receiver_phone" value={toPhoneForm(info.phone)} readOnly tabIndex={-1} />
                <span className="key">배송지</span>
                <span className="val">
                    <input type="hidden" data-type="receiver_zipcode" value={info.zipcode} readOnly tabIndex={-1} />
                    <textarea rows={1} data-type="receiver_address" value={info.address} readOnly tabIndex={-1} ref={textarea} />
                    <input type="text" data-type="receiver_address_detail" value={info.detailed_address} readOnly tabIndex={-1} />
                </span>
                <span className="key fullgrid">배송메모</span>
                <div className="val fullgrid rdc_gap">
                    <div className="ship_msg">
                        <input type="text" className="ship_msg_txt selectInput" value={value} data-type="shipping_message" onChange={handleChange} onClick={handleClick} readOnly={readOnly} ref={memo} />
                        <ul className={`${selectBoxOn ? 'on' : ''}`}>
                            <li className="ship_msg_txt">
                                <button type="button" onClick={selectBox}>
                                    부재시 경비실에 맡겨 주세요.
                                </button>
                            </li>
                            <li className="ship_msg_txt">
                                <button type="button" onClick={selectBox}>
                                    부재시 전화 주시거나 문자 남겨 주세요.
                                </button>
                            </li>
                            <li className="ship_msg_txt">
                                <button type="button" onClick={selectBox}>
                                    부재시 문앞에 놓아주세요.
                                </button>
                            </li>
                            <li className="ship_msg_txt">
                                <input type="text" data-type="direct" defaultValue={'직접 입력'} onClick={selectBox} />
                            </li>
                        </ul>
                    </div>

                    <p className="notice">배송기사님께 전달드릴 내용을 선택해주세요.</p>
                </div>
                <span className="key fullgrid">요청사항</span>
                <div className="val fullgrid rdc_gap">
                    <span>
                        <input className="ship_msg_txt" type="text" placeholder="요청사항을 작성해주세요." data-type="requirement" />
                    </span>
                    <p className="notice">
                        희망배송일 등의 관리자에게 요청할 내용을 기재해주세요.
                        <br />
                        &#8251; 해당란에 작성하신 내용은 택배사에 전달되지 않습니다.
                    </p>
                </div>
            </div>
            {addr && addr.state === 'success' && <OrderListPop type={'destination'} popOn={popOn} popClose={popClose} data={addr.data.data} setInfo={setInfo} params={params} setParams={setParams} />}
            <style jsx>{`
                .wrap {
                    position: relative;
                    display: grid;
                    grid-template-columns: 7rem 1fr;
                    gap: 1.2rem 0.5rem;
                    input {
                        display: inline-block;
                        border: 0;
                        width: auto;
                        height: auto;
                        padding-left: 0;
                        font-size: 1.4rem;
                        outline: none;
                    }
                    .fullgrid {
                        grid-column: 1 / 3;
                        &.rdc_gap {
                            margin-top: -0.7rem;
                        }
                    }
                    .change_addr {
                        position: absolute;
                        top: 1.2rem;
                        right: var(--side-padding-inner);
                        background: #f8f8fa;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        font-weight: 500;
                        font-size: 1.2rem;
                    }
                    .key {
                        display: flex;
                        align-items: top;
                        font-size: 1.6rem;
                        color: #767676;
                    }
                    .val {
                        display: flex;
                        flex-direction: column;
                        input {
                            &.selectInput {
                                cursor: pointer;
                                padding-right: 2.5rem;
                                position: relative;
                                z-index: 1;
                                background: transparent;
                            }
                        }
                        textarea {
                            font-size: 1.4rem;
                            overflow: hidden;
                        }
                        .ship_msg_txt {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            height: 3.5rem;
                            padding: 0 2.5rem 0 1rem;
                            border: 1px solid #a2a2a2;
                            border-radius: 0;
                            > * {
                                cursor: pointer;
                                font-size: 1.2rem;
                                color: #a2a2a2;
                            }
                        }
                        .ship_msg {
                            position: relative;
                            ul {
                                display: none;
                                position: absolute;
                                top: 100%;
                                left: 0;
                                width: 100%;
                                z-index: 1;
                                &.on {
                                    display: block;
                                }
                                li {
                                    border-top: 0;
                                    background: #fff;
                                    button {
                                        display: flex;
                                        min-height: 3.5rem;
                                        align-items: center;
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        text-align: left;
                                        color: #a2a2a2;
                                    }
                                }
                            }
                            &:after {
                                content: '▼';
                                display: block;
                                position: absolute;
                                top: 50%;
                                right: 1rem;
                                transform: translateY(-50%) scale(1.3, 0.8);
                                font-size: 1rem;
                                line-height: 0;
                                color: #767676;
                            }
                        }
                        .notice {
                            font-size: 1.2rem;
                            margin: 0.3rem 0 0 1rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
