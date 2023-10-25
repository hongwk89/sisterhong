import { useRouter } from 'next/router';
import { useEffect } from 'react';
import signOut from 'utils/signOut';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const type = router.query.errorType;

        if (type === 'RefreshTokenIsExpired') {
            alert('로그인 유효기간이 만료되었습니다. 다시 로그인하여주세요.');
            signOut(router, '/login');
            return;
        }

        signOut(router);
    }, []);

    return (
        <>
            <div></div>
            <style jsx>{`
                div {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    height: 100%;
                    z-index: 200;
                    background: #fff;
                }
            `}</style>
        </>
    );
}
