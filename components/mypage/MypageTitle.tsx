import { useRouter } from 'next/router';

export default function MypageTitle({ children, back = null, url = '/mypage' }) {
    const router = useRouter();

    const handleClick = () => {
        if (url === 'back') {
            router.back();
            return;
        }

        router.push(url);
    };

    return (
        <>
            <h1>
                {back !== null && (
                    <button type="button" className="backBtn" onClick={handleClick}>
                        <span className="hidden">뒤로가기</span>
                    </button>
                )}
                {children}
            </h1>
            <style jsx>{`
                @use 'styles/mixins';
                h1 {
                    position: relative;
                    padding: 4rem 0;
                    text-align: center;
                    font-size: 2.2rem;
                    font-weight: 700;
                    .backBtn {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        width: 3.5rem;
                        height: 3.5rem;
                        @include mixins.arrow(1.3rem, 0.2rem, 45deg, left, var(--main-color));
                    }
                }
            `}</style>
        </>
    );
}
