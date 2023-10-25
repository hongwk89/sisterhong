import getFormValues from 'utils/getFormValues';
import { useState, useRef } from 'react';
import usePwToggle from '@hooks/usePwToggle';
import useLogin from '@hooks/useLogin';
import CustomImage from '@components/CustomImage';
import Cookies from 'universal-cookie';

export default function InputForm({ submitted, setSubmitted, autoLoginRef }) {
    const cookies = new Cookies();
    const savedId = cookies.get('sisterhongId') || '';
    const [values, setValues] = useState({ user_id: savedId, password: '' });
    const [error, setError] = useState(false);
    const type = usePwToggle();
    const { loginService } = useLogin();
    const saveIdRef = useRef<HTMLInputElement>();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
        setError(false);

        const user = getFormValues(event.target);

        if (user.user_id === '' || user.password === '') {
            setError(true);
            setSubmitted(false);
            return;
        }

        const saveId = saveIdRef.current.checked ? values.user_id : null;
        const autoLogin = autoLoginRef.current.checked;

        loginService({ params: user, saveId, autoLogin });
        setSubmitted(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="inputs">
                <div>
                    <input type="text" name="user_id" placeholder="아이디 (이메일 주소)" value={values.user_id} onChange={handleChange}></input>
                    {error && !values.user_id && <p className="errorMessage">아이디를 입력해주세요</p>}
                </div>
                <div>
                    <div className="pwArea">
                        <input id="pw" type={type} name="password" placeholder="비밀번호" value={values.password} onChange={handleChange}></input>
                        <span className="eye">
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/eye.png`} alt="비밀번호 보기 토글" width={62} height={33} />
                        </span>
                    </div>
                    {error && !values.password && <p className="errorMessage">패스워드를 입력해주세요</p>}
                </div>
            </div>
            <div className="check">
                <div className="checkWrap">
                    <input type="checkbox" name="saveId" id="saveId" ref={saveIdRef} defaultChecked={savedId ? true : false} />
                    <label htmlFor="saveId">아이디 저장</label>
                </div>
                <div className="checkWrap">
                    <input type="checkbox" name="saveLogin" id="saveLogin" ref={autoLoginRef} />
                    <label htmlFor="saveLogin">자동로그인</label>
                </div>
            </div>
            <button className="commonButton typeRed" type="submit" disabled={submitted}>
                로그인
            </button>

            <style jsx>{`
                .inputs {
                    > div {
                        &:first-child {
                            margin-bottom: 1.2rem;
                        }
                        .pwArea {
                            position: relative;
                            .eye {
                                cursor: pointer;
                                display: block;
                                position: absolute;
                                top: 50%;
                                right: 1.5rem;
                                transform: translateY(-50%);
                                width: 2.5rem;
                                z-index: 10;
                            }
                        }
                        .errorMessage {
                            color: red;
                            font-size: 1.2rem;
                            margin-top: 0.2rem;
                        }
                    }
                }
                .check {
                    display: flex;
                    justify-content: left;
                    margin: 1.2rem 0 2rem;
                    padding-left: 1.5rem;
                    .checkWrap:first-child {
                        margin-right: 1rem;
                    }
                }
            `}</style>
        </form>
    );
}
