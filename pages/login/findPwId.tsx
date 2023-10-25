import AuthPhone from '@components/join/AuthPhone';
import FindResult from '@components/login/FindResult';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';

const TABS = [
    { name: '아이디 찾기', type: 'id' },
    { name: '비밀번호 찾기', type: 'password' }
];

interface findParams {
    phone: string;
    find: string;
    certification: number;
    user_id?: string;
}

export default function FindPwId() {
    const [init, setInit] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [result, setResult] = useState(null);
    const user_id = useRef(null);

    const handleTab = (e: React.TouchEvent | React.MouseEvent, idx: number) => {
        const target = e.target as HTMLButtonElement;

        if (!target.className.includes('active')) {
            setTabIndex(idx);

            setInit((prev) => !prev);
        }
    };

    const completeAuth = async ({ ...val }) => {
        const type = TABS[tabIndex].type;
        let params: findParams = { phone: val.phone, find: type, certification: val.certification };

        if (type === 'password') {
            params.user_id = user_id.current.value;
        }

        const config = { method: 'get', url: `${process.env.API_HOST}/auth/user-find`, params };
        const data = await sendAxios({ config, errFunc: (err) => alert(err.message) });

        if (data.state === 'success' && type === 'id') {
            setResult(data.data.data.user_id);
            return;
        } else if (data.state === 'success' && type === 'password') {
            setResult(data.data.data.password);
            return;
        }

        setInit((prev) => !prev);
    };

    const initTab = () => {
        setResult(null);
    };

    useEffect(() => {
        initTab();
    }, [init]);

    return (
        <>
            <PageTitle title="홍언니고기 - 아이디/비밀번호 찾기" />
            <div className="tabButton">
                {TABS.map((section, idx) => (
                    <button type="button" key={idx} className={`${tabIndex === idx ? 'active' : ''}`} onClick={(e) => handleTab(e, idx)}>
                        {section.name}
                    </button>
                ))}
            </div>
            <div className="tabContent">
                <p>
                    회원가입 시 입력하신 아이디와
                    <br />
                    전화번호로 본인인증이 진행됩니다.
                </p>
                <div>
                    {tabIndex === 1 && (
                        <div className="userId">
                            <input type="text" placeholder="아이디를 입력해주세요." ref={user_id} />
                        </div>
                    )}
                    <h1>휴대폰 인증</h1>
                    <AuthPhone callback={completeAuth} init={init} type={TABS[tabIndex].type} user_id={user_id.current?.value} />
                </div>
                {result !== null && (
                    <div className="showInfo">
                        <FindResult type={tabIndex} result={result} />
                        <Link legacyBehavior href="/login">
                            <a className="commonButton">로그인하기</a>
                        </Link>
                    </div>
                )}
            </div>

            <style jsx>{`
                .tabButton {
                    display: flex;
                    button {
                        display: block;
                        width: 50%;
                        padding: 1.2rem 0;
                        text-align: center;
                        font-size: 1.8rem;
                        color: #a2a2a2;
                        &.active {
                            color: #191919;
                            font-weight: 700;
                            border-bottom: 0.15rem solid #191919;
                        }
                    }
                }
                .tabContent {
                    padding: 4rem var(--side-padding-inner);
                    p {
                        color: #707070;
                        font-size: 1.8rem;
                        text-align: center;
                    }
                    .showInfo {
                        margin-top: 4rem;

                        a {
                            background: var(--main-color);
                            color: #fff;
                            font-weight: 700;
                        }
                        &.active {
                            display: block;
                        }
                    }
                    &.active {
                        display: block;
                    }
                    .userId {
                        margin-top: 1rem;
                        input {
                            text-align: center;
                            padding: 0;
                        }
                    }
                    h1 {
                        font-size: 1.8rem;
                        margin-top: 4rem;
                        font-weight: 500;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    );
}
