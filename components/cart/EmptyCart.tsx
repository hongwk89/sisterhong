import Link from 'next/link';

export default function EmptyCart() {
    return (
        <>
            <div className="text">
                <p>장바구니가 비었습니다.</p>
            </div>
            <div className="btn">
                <Link legacyBehavior href="/">
                    <a className="commonButton typeRed">쇼핑하러가기</a>
                </Link>
            </div>
            <style jsx>{`
                .text {
                    padding: 5rem 0;
                    p {
                        text-align: center;
                        font-size: 1.8rem;
                        color: #a2a2a2;
                    }
                }
                .btn {
                    text-align: center;
                    a {
                        display: inline-flex;
                        width: auto;
                        padding: 1rem 2.5rem;
                        border-radius: 0;
                        margin: 0 auto;
                    }
                }
            `}</style>
        </>
    );
}
