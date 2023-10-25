import { useRef } from 'react';
import friendShare from 'utils/friendShare';

export default function UserInfo({ data, rankColor, popOpen }) {
    const codeRef = useRef<HTMLSpanElement>();

    const handleShare = async () => {
        const code = codeRef.current.innerText;

        friendShare(`추천인코드(${code})가 적용된 주소가`, `${process.env.DOMAIN}/login?code=${code}`);
    };

    return (
        <>
            <div className="icon">
                <span style={{ color: `${rankColor[data.membership]}` }}>{data.membership.substring(0, 1).toUpperCase()}</span>
            </div>
            <div className="info">
                <p>
                    <span className="name">{data.user_name}</span> 님은
                    <button type="button" style={{ color: `${rankColor[data.membership]}` }} onClick={popOpen}>
                        {data.membership.toUpperCase()}
                    </button>
                    입니다.
                </p>
                <div>
                    <p>
                        회원님의 추천인 코드 : <span ref={codeRef}>{data.user_code}</span>
                    </p>
                    <button type="button" onClick={handleShare}>
                        공유하기
                    </button>
                </div>
            </div>
            <style jsx>{`
                .icon {
                    width: 6rem;
                    height: 6rem;
                    line-height: 6rem;
                    border-radius: 50%;
                    background: #f8f8fa;
                    text-align: center;
                    span {
                        font-size: 4rem;
                        font-family: 'roboto';
                        font-weight: 900;
                    }
                }
                .info {
                    > p {
                        color: #707070;
                        font-size: 1.8rem;
                        font-weight: 500;
                        span {
                            vertical-align: top;
                            &.name {
                                color: #000000;
                            }
                        }
                        button {
                            font-size: 1.8rem;
                            margin: 0 0.2rem 0 0.4rem;
                            font-weight: 500;
                            vertical-align: top;
                            text-decoration: underline;
                        }
                    }
                    > div {
                        display: flex;
                        gap: 0.5rem;
                        align-items: center;
                        p {
                            font-size: 1.4rem;
                            font-weight: 500;
                            color: #707070;
                            max-width: 20rem;
                            span {
                                color: var(--main-color);
                                vertical-align: top;
                            }
                        }
                        button {
                            display: block;
                            padding: 0.5rem 1rem;
                            font-size: 1.2rem;
                            background: #f8f8fa;
                            border-radius: 0.5rem;
                            color: #000;
                            font-weight: 500;
                        }
                    }
                }
            `}</style>
        </>
    );
}
