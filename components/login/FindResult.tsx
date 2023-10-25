export default function FindResult({ type, result }) {
    return (
        <>
            {type === 0 ? (
                <div className="findId">
                    <p>
                        회원님의 아이디는
                        <br />
                        <span>{result}</span> 입니다.
                    </p>
                </div>
            ) : (
                <div className="findPw">
                    <p>임시비밀번호가 발급되었습니다.</p>
                    <p>{result}</p>
                    <p>
                        발급된 비밀번호는 임시적인 것으로 로그인 후<br />
                        마이페이지에서 비밀번호를 꼭 변경해주세요.
                    </p>
                </div>
            )}

            <style jsx>{`
                div {
                    margin-bottom: 4rem;
                    &.findId {
                        p {
                            color: #707070;
                            font-weight: 500;
                            font-size: 1.8rem;
                            text-align: center;
                            span {
                                vertical-align: baseline;
                                color: #000;
                            }
                        }
                    }
                    &.findPw {
                        p {
                            text-align: center;
                            &:first-child {
                                font-size: 1.8rem;
                            }
                            &:nth-child(2) {
                                margin: 0.5rem 0;
                                padding: 1rem 0;
                                font-size: 2rem;
                                color: #000000;
                                font-weight: 700;
                            }
                            &:last-child {
                                font-size: 1.4rem;
                                color: #707070;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
