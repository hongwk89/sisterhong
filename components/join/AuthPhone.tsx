import onlyNumber from 'utils/onlyNumber';
import { useInputLength } from '@hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import useTimer from '@hooks/useTimer';
import sendAxios from 'utils/sendAxios';

interface timer {
    init?: number;
    begin?: boolean;
    now?: number;
    end?: number;
    unit?: 's';
    reset?: boolean;
}

export default function AuthPhone({ callback = null, init = false, type = null, data = null, user_id = null }) {
    const [submit, setSubmit] = useState(false);
    const [submit2, setSubmit2] = useState(false);
    const [timer, setTimer] = useState<timer>({});
    const checkAuth = useRef<HTMLDivElement>();
    const receiveAuthBtn = useRef<HTMLButtonElement>();
    const checkAuthBtn = useRef<HTMLButtonElement>();
    const phCheck = useRef<HTMLInputElement>();
    const phone = useRef<string>();
    const reset = useRef(false);
    let time = useTimer(timer);
    const phoneNumber = [data ? data.phone.slice(0, 3) : '', data ? data.phone.slice(3, 7) : '', data ? data.phone.slice(7, 11) : ''];

    const handleAuth = async () => {
        setSubmit(true);

        phone.current = (document.getElementsByName('phone1')[0] as HTMLInputElement).value + (document.getElementsByName('phone2')[0] as HTMLInputElement).value + (document.getElementsByName('phone3')[0] as HTMLInputElement).value;

        if (phone.current.length !== 11) {
            alert('핸드폰번호를 확인하여주세요');
            setSubmit(false);
            return;
        }

        const config = { method: 'post', url: `${process.env.API_HOST}/message/certification`, data: { phone: phone.current } };
        const success = () => {
            const obj = receiveAuthBtn.current;

            reset.current = !reset.current;
            setTimer({ init: 180, begin: true, unit: 's', reset: reset.current });

            if (!obj.className.includes('submitted')) {
                obj.className += ' submitted';
                obj.innerText = '인증번호 재전송';
                checkAuth.current.style.display = 'flex';
                phCheck.current.focus();
            }
        };
        const fail = (err) => {
            alert(err.message);
            setSubmit(false);
        };

        await sendAxios({ config, resFunc: success, errFunc: fail });
    };

    const handleAuthCheck = async () => {
        if (type === 'password' && user_id === '') {
            alert('아이디를 입력해주세요');
            return;
        }

        setSubmit2(true);

        const number = phCheck.current.value;
        let check = false;

        const config = { method: 'post', url: `${process.env.API_HOST}/message/certification/check`, data: { phone: phone.current, certification: number } };
        const success = () => {
            phCheck.current.dataset.check = 'true';
            checkAuthBtn.current.className += ' typeBlack';
            checkAuthBtn.current.innerText = '인증완료';
            check = true;
            reset.current = !reset.current;
            setTimer({ init: 0, unit: 's' });
        };
        const fail = (err) => {
            alert(err.message);
            setSubmit2(false);
        };

        await sendAxios({ config, resFunc: success, errFunc: fail });

        if (check && callback !== null) {
            if (type === 'memberCheck') {
                callback(phone.current);
            }
            if (type === 'id' || type === 'password') {
                callback({ phone: phone.current, certification: phCheck.current.value });
            }
        }
    };

    const initArea = () => {
        if (!data) {
            receiveAuthBtn.current.innerHTML = '인증번호받기';
            receiveAuthBtn.current.classList.remove('submitted');
            checkAuth.current.style.display = 'none';
            checkAuthBtn.current.classList.remove('typeBlack');
            checkAuthBtn.current.innerText = '인증하기';
            checkAuthBtn.current.classList.remove('submitted');
            phCheck.current.dataset.check = 'false';
            phCheck.current.value = '';
        }

        setSubmit(false);
        setSubmit2(false);
    };

    useEffect(() => {
        // 시간 완료 재전송 가능
        if (time !== null && time <= 0 && checkAuthBtn.current.innerText !== '인증완료') {
            receiveAuthBtn.current.classList.remove('submitted');
            setSubmit(false);
        }
    }, [time]);

    useEffect(() => {
        initArea();
    }, [init]);

    useEffect(() => {
        setSubmit(false);
        setSubmit2(false);
    }, [type]);

    return (
        <>
            <div className="threeBox">
                <input type="number" name="phone1" placeholder="010" {...useInputLength(3, phoneNumber[0])} {...onlyNumber()} />
                <span>-</span>
                <input type="number" name="phone2" placeholder="0000" {...useInputLength(4, phoneNumber[1])} {...onlyNumber()} />
                <span>-</span>
                <input type="number" name="phone3" placeholder="0000" {...useInputLength(4, phoneNumber[2])} {...onlyNumber()} />
            </div>
            <button type="button" className="receiveAuth commonButton" onClick={handleAuth} disabled={submit} ref={receiveAuthBtn}>
                인증번호받기
            </button>
            <div className="checkAuth" ref={checkAuth}>
                <div className="input">
                    <input id="phCheck" type="number" name="certification" placeholder="인증코드 입력" data-check="false" {...onlyNumber('Enter', handleAuthCheck)} ref={phCheck} data-name="휴대전화" />
                    <span className="checkIcon"></span>
                </div>
                <span className="timer">남은 시간 {time}초</span>
                <button type="button" className="commonButton" onClick={handleAuthCheck} disabled={submit2} ref={checkAuthBtn}>
                    인증하기
                </button>
            </div>

            <style jsx>{`
                $iconRight: 1rem;
                $iconWidth: 2rem;
                .threeBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                    input {
                        padding: 0;
                        text-align: center;
                        &:read-only {
                            background: #f8f8fa;
                            border: none;
                        }
                    }
                    span {
                        padding: 0 0.5rem;
                    }
                }
                .notice {
                    font-size: 1.2rem;
                    color: #707070;
                    text-align: center;
                    margin-top: 0.4rem;
                }
                .receiveAuth {
                    margin-top: 1rem;
                    &.submitted {
                        color: #a2a2a2;
                    }
                }
                .checkAuth {
                    display: none;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                    .input {
                        position: relative;
                        width: 60%;
                        input {
                            padding: 0 calc($iconRight + $iconWidth) 0 1.5rem;
                            &[data-check='true'] + .checkIcon {
                                background: url(${process.env.AWS_IMAGE_URL}/images/check.png) center center no-repeat;
                                background-size: contain;
                            }
                        }
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
                    span {
                        display: inline-block;
                        font-size: 1.4rem;
                        font-weight: 500;
                    }
                    .commonButton {
                        flex-basis: 100%;
                        margin-top: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
