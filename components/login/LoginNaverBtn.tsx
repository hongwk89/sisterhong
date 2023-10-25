import CustomImage from '@components/CustomImage';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function LoginNaverBtn({ submitted, setSubmitted, autoLoginRef }) {
    const naverBtn = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const code = router.query.code as string;
    const returnUrl = router.query.returnUrl as string;

    const NaverLoginInit = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: process.env.NAVER_CLIENT_ID, // ClientID
            callbackUrl: process.env.DOMAIN + `/login/loginNaverCallback?code=${code}&returnUrl=${returnUrl}&autoLogin=${autoLoginRef.current.checked}`, // Callback URL
            isPopup: false, // 팝업 형태로 인증 여부
            loginButton: { color: 'green', type: 3, height: '45' }
        });
        naverLogin.init();
    };

    const handleClick = () => {
        setSubmitted(true);

        const element = naverBtn.current.children[0] as HTMLElement;

        element.click();
    };

    useEffect(() => {
        NaverLoginInit();
    }, []);

    return (
        <>
            <div id="naverIdLogin" ref={naverBtn}></div>
            <button className="commonButton" type="button" onClick={handleClick} disabled={submitted}>
                <span className="image">
                    <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/naver.png`} alt="네이버 아이콘" width={54} height={48} />
                </span>
                네이버 로그인
            </button>
            <style jsx>{`
                #naverIdLogin {
                    display: none;
                }
                button {
                    background: #2db400;
                    color: #fff;
                    span {
                        display: inline-block;
                        width: 2.7rem;
                        margin-right: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
