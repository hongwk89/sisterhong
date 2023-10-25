import useLogin from '@hooks/useLogin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginNaverCallback() {
    const router = useRouter();
    const code = router.query.code === 'undefined' ? '' : (router.query.code as string);
    const returnUrl = router.query.returnUrl === 'undefined' ? '' : (router.query.returnUrl as string);

    const { loginCheck } = useLogin();

    const loginNaver = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: process.env.NAVER_CLIENT_ID // ClientID
        });
        naverLogin.init();

        naverLogin.getLoginStatus((state) => {
            if (state) {
                const { id, email } = naverLogin.user;
                const params = {
                    source: 'N',
                    source_key: id,
                    user_id: email,
                    autoLogin: router.query.autoLogin === 'true' ? true : null
                };

                loginCheck(params, code, returnUrl);
            } else {
                alert('비로그인 상태');
                router.replace('/login');
            }
        });
    };

    useEffect(() => {
        loginNaver();
    }, []);

    return (
        <>
            <div></div>
            <style jsx>{`
                div {
                    position: fixed;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 200;
                    background: #fff;
                }
            `}</style>
        </>
    );
}
