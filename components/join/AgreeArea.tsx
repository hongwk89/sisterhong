import Popup from '@components/Popup';
import usePopToggle from '@hooks/usePopToggle';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import checkToggle from 'utils/checkToggle';
import AgreeForm from './AgreeForm';

const TEXTS = [
    {
        type: 'terms',
        title: '이용약관 동의 (필수)',
        require: 'required',
        text: AgreeForm.TermsFormText
    },
    {
        type: 'personal',
        title: '개인정보 수집 및 이용동의 (필수)',
        require: 'required',
        text: AgreeForm.PersonalFormText
    },
    {
        type: 'marketing',
        title: '개인정보 수집 및 이용동의 (선택)',
        require: 'choice',
        text: AgreeForm.MarketingFormText
    },
    { type: 'adult', title: '본인은 만 14세 이상입니다. (필수)', require: 'required' },
    { type: 'receive', title: '이벤트, 할인쿠폰 등 혜택/정보 수신동의 (선택)', require: 'choice' }
];

interface defChk {
    marketing: string;
    sms: string;
    mailing: string;
}

export default function AgreeArea({ data = null }) {
    const { popOn, popOpen, popClose } = usePopToggle();
    const [popData, setPopData] = useState(TEXTS[0]);
    const agreeArea = useRef();
    const agreeAll = useRef();
    const reception = useRef();
    const textData = data ? TEXTS.filter((list) => list['require'] !== 'required') : TEXTS;
    const emptyBirthday = !data || data.birthday === '';

    const openPop = (type: string) => {
        const changeData = TEXTS.filter((list) => list.type === type)[0];
        setPopData(changeData);
        popOpen();
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const lastAgree = ['receive', 'sms', 'email'];

        if (lastAgree.includes(id)) {
            checkToggle(reception.current, document.querySelector('#' + lastAgree[0]), e.target);
        }

        checkToggle(agreeArea.current, agreeAll.current, e.target);
    };

    const defChk = (chkData: defChk, type: string) => {
        if (chkData) {
            if (type === 'all') {
                return chkData.marketing === 'T' && chkData.sms === 'T' && chkData.mailing === 'T';
            } else if (type === 'receive') {
                return chkData.sms === 'T' && chkData.mailing === 'T';
            } else {
                return chkData[type] === 'T';
            }
        } else {
            return false;
        }
    };

    return (
        <>
            <div className="agreeAreaWrap">
                <p className="title">
                    이용약관동의<span>*</span>
                </p>
                <div className="agreeArea" ref={agreeArea}>
                    <div className="check agreeAll">
                        <div className="checkWrap">
                            <input type="checkbox" name="agreeAll" id="agreeAll" onChange={handleCheck} ref={agreeAll} defaultChecked={defChk(data, 'all')} />
                            <label htmlFor="agreeAll">전체 동의합니다.</label>
                        </div>
                    </div>
                    <ul className="check agrees">
                        {textData.map((list, idx) => {
                            if (!emptyBirthday && list.type === 'marketing' && data.marketing === 'T') {
                                return;
                            }

                            return (
                                <li key={idx}>
                                    <div className="checkWrap">
                                        <input type="checkbox" name={list.type} id={list.type} data-type={list.require} onChange={handleCheck} defaultChecked={defChk(data, list.type)} />
                                        <label htmlFor={list.type}>{list.title}</label>
                                        {list.text && (
                                            <button type="button" onClick={() => openPop(list.type)}>
                                                <span className="hidden">내용보기</span>
                                            </button>
                                        )}
                                    </div>

                                    {list.type === 'receive' && (
                                        <div className="reception" ref={reception}>
                                            <div className="checkWrap">
                                                <input type="checkbox" name="sms" id="sms" onChange={handleCheck} defaultChecked={defChk(data, 'sms')} />
                                                <label htmlFor="sms">sms</label>
                                            </div>
                                            <div className="checkWrap">
                                                <input type="checkbox" name="mailing" id="email" onChange={handleCheck} defaultChecked={defChk(data, 'mailing')} />
                                                <label htmlFor="email">이메일</label>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Popup data={popData} popOn={popOn} popClose={popClose} />
            <style jsx>{`
                @use 'styles/mixins';
                .agreeAreaWrap {
                    padding: 1.5rem var(--side-padding-inner) 4.3rem;
                    border-top: 0.5rem solid #f8f8fa;
                    .title {
                        font-size: 1.4rem;
                        font-weight: 500;
                        margin-bottom: 0.6rem;
                        span {
                            vertical-align: top;
                            color: var(--main-color);
                        }
                    }
                    .agreeArea {
                        .check {
                            &.agreeAll {
                                padding: 1.5rem 0;
                                border-bottom: 0.1rem solid #e8e8e8;
                                label {
                                    font-size: 1.8rem;
                                    font-weight: 500;
                                }
                            }
                            &.agrees {
                                margin-top: 1.5rem;
                                .checkWrap {
                                    position: relative;
                                    margin-bottom: 1rem;
                                    button {
                                        display: block;
                                        position: absolute;
                                        top: 50%;
                                        right: 0;
                                        width: 1.5rem;
                                        height: 1.5rem;
                                        transform: translateY(-50%);
                                        @include mixins.arrow(0.7rem, 0.1rem, 45deg, right, #a2a2a2);
                                    }
                                }
                                .reception {
                                    display: flex;
                                    justify-content: left;
                                    padding-left: 2.6rem;
                                    .checkWrap {
                                        margin-right: 4rem;
                                        margin-bottom: 0;
                                        &:last-child {
                                            margin-right: 0;
                                        }
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
