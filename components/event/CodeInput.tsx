import useTokenStore from '@hooks/store/auth/useTokenStore';
import { useRouter } from 'next/router';
import sendAxios from 'utils/sendAxios';

export default function CodeInput({ idx, code, setCodes, count, prefix, button }) {
    const { token } = useTokenStore();
    const router = useRouter();

    const handleClick = () => {
        count.current++;

        if (button === 'add') {
            setCodes((prev) => [...prev, { idx: count.current, value: '', check: false, error: '' }]);
            return;
        }

        setCodes((prev) => prev.filter((list) => list.idx !== code.idx));
    };

    const handleChange = async (e) => {
        if (!token) {
            if (confirm('응모하시려면 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?')) {
                router.push('/login/?returnUrl=' + router.asPath);
            }
            return;
        }

        const val = e.target.value;

        if (val.length !== 5) {
            setCodes((prev) => [...prev.slice(0, idx), { ...prev[idx], value: val, check: false, error: '' }, ...prev.slice(idx + 1)]);
            return;
        }

        const config = { method: 'post', url: `${process.env.API_HOST}/issue/code`, data: { issue_code: [prefix + val.toUpperCase()] } };

        const result = await sendAxios({ config });

        setCodes((prev) => [...prev.slice(0, idx), { ...prev[idx], value: val, check: result.state === 'fail' ? false : true, error: result.state === 'fail' ? result.data.message : '' }, ...prev.slice(idx + 1)]);
    };

    return (
        <>
            <li>
                <span>{prefix} - </span>
                <div>
                    <input type="text" value={code.value} onChange={handleChange} maxLength={5}></input>
                    <span className="check" data-check={code.check}></span>
                </div>
                <button type="button" className={button} onClick={handleClick}>
                    <span className="hidden">{button === 'add' ? '추가' : '제거'}</span>
                </button>
                <p className="error">{code.error}</p>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    span {
                        color: #fff;
                        font-size: 1.8rem;
                        font-weight: 500;
                    }
                    > div {
                        position: relative;
                        width: 55%;
                        input {
                            border-radius: 0;
                            height: 3rem;
                            border: 0;
                            padding: 0 1rem;
                            font-size: 1.6rem;
                            font-weight: 700;
                        }
                        .check {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            right: 1rem;
                            &[data-check='false'] {
                                :before {
                                    content: '!';
                                    color: #777;
                                }
                            }
                            &[data-check='true'] {
                                :before {
                                    content: '';
                                    display: block;
                                    width: 0.8rem;
                                    height: 0.6rem;
                                    border: 0.2rem solid #259ce0;
                                    clip-path: polygon(0 0.3rem, 0.9rem 0.3rem, 0.9rem 100%, 0 100%);
                                    transform: translateY(-30%) rotate(-45deg);
                                }
                            }
                        }
                    }
                    button {
                        position: relative;
                        width: 3rem;
                        height: 3rem;
                        background: #fff;
                        &:before {
                            content: '';
                            display: block;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            width: 1.7rem;
                            height: 0.2rem;
                            background: #777;
                            margin: 0 auto;
                        }
                        &.add {
                            &:before {
                                background: #259ce0;
                            }
                            &:after {
                                content: '';
                                display: block;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                width: 1.7rem;
                                height: 0.2rem;
                                background: #259ce0;
                                margin: 0 auto;
                                transform: translate(-50%, -50%) rotate(90deg);
                            }
                        }
                    }
                    .error {
                        width: 100%;
                        color: #fff;
                        font-size: 1rem;
                        text-align: center;
                        margin-top: 0.2rem;
                    }
                }
            `}</style>
        </>
    );
}
