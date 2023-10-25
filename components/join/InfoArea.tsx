import useInput, { useInputBDay } from '@hooks/useInput';
import { useState } from 'react';
import onlyNumber from 'utils/onlyNumber';
import sendAxios from 'utils/sendAxios';
import AuthPhone from './AuthPhone';
import CheckInput from './CheckInput';
import SetPw from './SetPw';

export default function InfoArea({ sns = null, data = null }) {
    const [check, setCheck] = useState(false);
    const birthday = data ? [data.birthday.substr(0, 2), data.birthday.substr(2)] : ['', ''];
    const name = data ? data.user_name : '';
    const emptyBirthday = !data || data.birthday === '';

    //이메일체크
    const chkEmail = () => {
        const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value }
            } = event;

            if (value.includes('com')) {
                const config = { method: 'post', url: `${process.env.API_HOST}/auth/sign-check-id`, data: { user_id: value } };
                const fail = (err) => {
                    setCheck(false);
                    alert(err.message);
                };

                await sendAxios({ config, resFunc: () => setCheck(true), errFunc: fail });
            }
        };

        return { onChange, 'data-check': check };
    };

    //이름체크
    const regName = /^[가-힣a-zA-Z]{2,}/g;
    const validName = (value: string) => regName.test(value);
    const chkName = useInput(name, validName);

    return (
        <>
            <div className="wrap">
                {!sns && (
                    <>
                        <div className="inputArea">
                            <p className="title">
                                아이디 (이메일 주소)<span>*</span>
                            </p>
                            <div className="input">{data ? <CheckInput name="user_id" val={data.user_id} readOnly={true} /> : <CheckInput name="user_id" text="hello@sisterhong.co.kr" func={chkEmail} />}</div>
                        </div>
                        <SetPw data={data} />
                    </>
                )}
                <div className="inputArea">
                    <p className="title">
                        이름<span>*</span>
                    </p>
                    <div className="input">
                        <input type="text" name="user_name" placeholder="이름을 입력해주세요." {...chkName} data-name="이름" />
                        <span className="checkIcon"></span>
                    </div>
                </div>
                <div className="inputArea">
                    <p className="title">
                        휴대전화<span>*</span>
                    </p>
                    <AuthPhone data={data} />
                </div>
                <div className="inputArea birth">
                    <p className="title">생일</p>
                    <div className="threeBox">
                        <input type="number" name="birth1" placeholder={emptyBirthday ? '월' : ''} {...useInputBDay(birthday[0])} {...onlyNumber()} readOnly={!emptyBirthday} data-name="생일" />
                        <span>/</span>
                        <input type="number" name="birth2" placeholder={emptyBirthday ? '일' : ''} {...useInputBDay(birthday[1])} {...onlyNumber()} readOnly={!emptyBirthday} data-name="생일" />
                    </div>
                    {emptyBirthday && <p className="notice">미기재 또는 개인정보 수집 및 이용동의(선택) 미동의 시 생일쿠폰 발급이 불가능합니다.</p>}
                </div>
                {!data && (
                    <div className="inputArea">
                        <p className="title">추천인코드</p>
                        <CheckInput name="recommender" text="추천인코드를 입력해주세요." />
                    </div>
                )}
            </div>
            <style jsx global>{`
                .inputArea {
                    margin-bottom: 3rem;
                    input {
                        padding: 0 3rem 0 1.5rem;
                        &[data-check='true'] + .checkIcon {
                            background: url(${process.env.AWS_IMAGE_URL}/images/check.png) center center no-repeat !important;
                            background-size: contain !important;
                        }
                        &:read-only {
                            background: #f8f8fa;
                            border: none;
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                $iconRight: 1rem;
                $iconWidth: 2rem;
                .wrap {
                    padding: 0 var(--side-padding-inner) 3rem;
                    .inputArea {
                        .title {
                            font-size: 1.4rem;
                            font-weight: 500;
                            margin-bottom: 0.6rem;
                            span {
                                vertical-align: top;
                                color: var(--main-color);
                            }
                        }
                        .input {
                            position: relative;
                            .checkIcon {
                                display: block;
                                position: absolute;
                                top: 50%;
                                right: $iconRight;
                                width: $iconWidth;
                                height: calc($iconWidth + 1rem);
                                transform: translateY(-50%);
                                background: url(${process.env.AWS_IMAGE_URL}/images/exclamation.png) center center no-repeat;
                                background-size: contain;
                            }
                        }
                        .notice {
                            margin-top: 0.4rem;
                            font-size: 1.2rem;
                            color: #707070;
                            padding-left: 1.7rem;
                        }

                        &:last-child {
                            margin-bottom: 0;
                        }
                        .threeBox {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            text-align: center;
                            input {
                                text-align: center;
                            }
                            span {
                                padding: 0 0.5rem;
                            }
                        }
                        &.birth {
                            input {
                                padding: 0 1.5rem;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
