import Link from 'next/link';

export default function ContactEmpty({}) {
    return (
        <>
            <div>
                <p>문의 내역이 없습니다.</p>
                <Link legacyBehavior href="/mypage/contact/write">
                    <a>문의하기</a>
                </Link>
            </div>
            <style jsx>{`
                p {
                    font-size: 1.6rem;
                    color: #a2a2a2;
                    text-align: center;
                }
                a {
                    display: flex;
                    margin: 3rem auto;
                    border: 0.1rem solid var(--main-color);
                    border-radius: 0.3rem;
                    width: 8.8rem;
                    height: 3.3rem;
                    justify-content: center;
                    align-items: center;
                    color: var(--main-color);
                    font-size: 1.6rem;
                    font-weight: 500;
                }
            `}</style>
        </>
    );
}
