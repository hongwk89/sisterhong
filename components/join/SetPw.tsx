import useInput from '@hooks/useInput';
import usePwToggle from '@hooks/usePwToggle';
import { useRef } from 'react';

export default function SetPw({ data }) {
    const type = usePwToggle();
    const pw = useRef<HTMLInputElement>();

    //비밀번호체크
    const regPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{7,16}$/;
    const validPw = (value: string) => regPw.test(value);
    const chkPw = useInput('', validPw);

    //비밀번호확인체크
    const validPw2 = (value: string) => value === pw.current.value && value.length >= 7;
    const chkPw2 = useInput('', validPw2);

    return (
        <>
            <div className="inputArea">
                <p className="title">비밀번호{data === null && <span>*</span>}</p>
                <div className="input">
                    <input id="pw" type={type} name="password" placeholder="비밀번호를 입력해주세요" {...chkPw} data-name="비밀번호" ref={pw} />
                    <span className="checkIcon"></span>
                </div>
                <p className="notice">7~25자리, 영문과 숫자 필수 포함</p>
            </div>
            <div className="inputArea">
                <p className="title">비밀번호 확인{data === null && <span>*</span>}</p>
                <div className="input">
                    <input type={type} name="password2" placeholder="비밀번호를 한번 더 입력해주세요" {...chkPw2} data-name="비밀번호" />
                    <span className="checkIcon"></span>
                </div>
                {data && <p className="notice">비밀번호 변경시에는 휴대전화 인증 필수</p>}
            </div>

            <style jsx>{`
                $iconRight: 1rem;
                $iconWidth: 2rem;
                .inputArea {
                    margin-bottom: 3rem;
                    input {
                        padding: 0 calc($iconRight + $iconWidth) 0 1.5rem;
                        &[data-check='true'] + .checkIcon {
                            background: url(${process.env.AWS_IMAGE_URL}/images/check.png) center center no-repeat;
                            background-size: contain;
                        }
                    }
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
                }
            `}</style>
        </>
    );
}
