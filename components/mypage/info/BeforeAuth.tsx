import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function BeforeAuth({ setPage, setData }) {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const pw = useRef<HTMLInputElement>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/auth/user-password-check`,
            data: { password: value }
        };

        const fail = (err) => {
            alert(err.message);
            setLoading(false);
            setValue('');
            pw.current.focus();
        };

        const { state } = await sendAxios({ config, errFunc: (err) => fail(err) });

        if (state === 'success') {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/auth/user-info`
            };
            const success = (res) => {
                setData(res);
                setPage(true);
            };
            const fail = (err) => {
                alert(err.message);
            };
            await sendAxios({
                config,
                resFunc: success,
                errFunc: fail
            });
        }
        setLoading(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div className="wrap">
                <h5>비밀번호 확인</h5>
                <p>
                    고객님의 정보를 안전하게 보호하기 위하여
                    <br />
                    현재 비밀번호를 한 번 더 입력해주세요.
                </p>
                <form onSubmit={handleSubmit}>
                    <input type="password" value={value} onChange={handleChange} ref={pw} />
                    <div>
                        <Link href="/mypage" legacyBehavior passHref>
                            <a>취소</a>
                        </Link>
                        <button type="submit" disabled={loading}>
                            확인
                        </button>
                    </div>
                </form>
            </div>
            <style jsx>{`
                .wrap {
                    padding: 0 var(--side-padding-inner);
                    h5 {
                        font-size: 1.8rem;
                        font-weight: 500;
                        text-align: center;
                        margin-bottom: 4.3rem;
                    }
                    p {
                        font-size: 1.6rem;
                        color: #767676;
                        text-align: center;
                        margin-bottom: 2rem;
                    }
                    input {
                        height: 3.5rem;
                        text-align: center;
                        padding-left: 0;
                    }
                    div {
                        display: flex;
                        justify-content: center;
                        gap: 1rem;
                        margin: 2rem 0 3rem;
                        > * {
                            display: block;
                            width: 7rem;
                            height: 3.5rem;
                            line-height: 3.5rem;
                            text-align: center;
                            background: #a2a2a2;
                            color: #fff;
                            font-size: 1.8rem;
                            font-weight: 500;
                            &:first-child {
                                background: #fff;
                                border: 0.1rem solid #a2a2a2;
                                color: #a2a2a2;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
