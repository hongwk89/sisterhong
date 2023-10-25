import InputForm from '@components/login/InputForm';
import LoginNaverBtn from '@components/login/LoginNaverBtn';
import LoginKakaoBtn from '@components/login/LoginKakaoBtn';
import Link from 'next/link';
import { useRef, useState } from 'react';
import PageTitle from '@components/PageTitle';
import { useRouter } from 'next/dist/client/router';

export default function Login() {
    const [submitted, setSubmitted] = useState(false);
    const autoLoginRef = useRef<HTMLInputElement>();
    const router = useRouter();
    let query = '';

    if (router.query.returnUrl) {
        query += 'returnUrl=' + router.query.returnUrl;
    }
    if (router.query.code) {
        if (query !== '') query += '&';
        query += 'code=' + router.query.code;
    }

    return (
        <>
            <PageTitle title="홍언니고기 - 로그인" />
            <div className="loginWrap">
                <h1>로그인</h1>
                <div className="normalLogin">
                    <InputForm submitted={submitted} setSubmitted={setSubmitted} autoLoginRef={autoLoginRef} />
                    <Link legacyBehavior href={query ? '/join?' + query : '/join'}>
                        <a className="joinButton commonButton typeWhite">회원가입하기</a>
                    </Link>
                    <div className="find">
                        <Link legacyBehavior href="/login/findPwId">
                            <a>아이디 / 비밀번호 찾기</a>
                        </Link>
                    </div>
                </div>
                <h2>간편 로그인</h2>
                <div className="snsLogin">
                    <div>
                        <LoginKakaoBtn submitted={submitted} setSubmitted={setSubmitted} autoLoginRef={autoLoginRef} />
                    </div>
                    <div>
                        <LoginNaverBtn submitted={submitted} setSubmitted={setSubmitted} autoLoginRef={autoLoginRef} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .loginWrap {
                    padding: 0 var(--side-padding-inner);
                    h1,
                    h2 {
                        font-size: 2.2rem;
                        font-weight: 700;
                        margin: 4rem 0 1.6rem;
                        text-align: center;
                    }
                    .normalLogin {
                        .joinButton {
                            margin-top: 1.2rem;
                        }
                        .find {
                            a {
                                display: block;
                                font-size: 1.4rem;
                                color: #707070;
                                margin-top: 0.6rem;
                                text-align: center;
                            }
                        }
                    }
                    .snsLogin {
                        padding-bottom: 5.5rem;
                        div {
                            &:first-of-type {
                                margin-bottom: 1.2rem;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
