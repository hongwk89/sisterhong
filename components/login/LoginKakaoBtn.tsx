import CustomImage from '@components/CustomImage';
import useLogin from '@hooks/useLogin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginKakaoBtn({ submitted, setSubmitted, autoLoginRef }) {
    const router = useRouter();
    const code = router.query.code as string;
    const returnUrl = router.query.returnUrl as string;
    const { loginCheck } = useLogin();

    const loginFormKakao = () => {
        setSubmitted(true);
        window.Kakao.Auth.login({
            success(authObj) {
                window.localStorage.setItem('token', authObj.access_token);
                window.Kakao.API.request({
                    url: '/v2/user/me', // 사용자 정보 가져오기
                    success: (res) => {
                        const params = {
                            source: 'K',
                            source_key: res.id,
                            user_id: res.kakao_account.email,
                            autoLogin: autoLoginRef.current.checked
                        };
                        loginCheck(params, code, returnUrl);
                    }
                });
            },
            fail(err) {
                alert(err);
            }
        });
    };

    const KakaoLoginInit = () => {
        try {
            if (!window.Kakao.isInitialized() && window.Kakao) {
                window.Kakao.init(process.env.KAKAO_CLIENT_JAVASCRIPT);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        KakaoLoginInit();
    }, []);

    return (
        <>
            <button className="commonButton" type="button" onClick={loginFormKakao} disabled={submitted}>
                <span className="image">
                    <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/kakao.png`} alt="카카오 아이콘" width={54} height={48} />
                </span>
                카카오 로그인
            </button>
            <style jsx>{`
                button {
                    background: #fae300;
                    color: #391b1b;
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
