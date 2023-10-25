import AuthPhone from '@components/join/AuthPhone';
import PageTitle from '@components/PageTitle';
import useLogin from '@hooks/useLogin';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function MemberCheck() {
    const router = useRouter();
    const user_id = router.query.user_id;
    const source_key = router.query.source_key === undefined ? '' : router.query.source_key;
    const sign_type = source_key !== '' ? 'social' : 'normal';
    const { loginService } = useLogin();
    const [check, setCheck] = useState(false);
    const returnUrl = router.query.returnUrl ? decodeURIComponent(router.query.returnUrl.toString()) : '/';

    const completeAuth = async (phone: string) => {
        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/auth/convert`,
            data: {
                user_id,
                source_key,
                phone,
                sign_type
            }
        };
        const success = async () => {
            if (source_key) {
                loginService({ params: { user_id, source_key } });
            }

            if (returnUrl) {
                router.push(returnUrl);
                return;
            }

            setCheck(true);
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 본인인증" />
            <div className="wrap">
                <h1>본인인증</h1>
                <p>
                    고객님의 정보를 안전하게 보호하기 위하여
                    <br />
                    본인인증 후 로그인 또는 구매가 가능합니다.
                </p>
                <div>
                    <AuthPhone callback={completeAuth} type="memberCheck" />
                </div>
                {check && (
                    <div className="notice">
                        <p>본인인증이 완료 되었습니다.</p>
                        <Link legacyBehavior href="/">
                            <a className="commonButton typeRed">홈으로 바로가기</a>
                        </Link>
                    </div>
                )}
            </div>
            <style jsx>{`
                .wrap {
                    padding: 4rem var(--side-padding-inner);
                    text-align: center;
                    > h1 {
                        margin-bottom: 2rem;
                        font-size: 2.2rem;
                        font-weight: 700;
                    }
                    > p {
                        font-size: 1.4rem;
                    }
                    .notice {
                        p {
                            font-size: 1.6rem;
                            font-weight: 500;
                            color: #707070;
                            padding: 2rem 0;
                        }
                    }
                }
            `}</style>
        </>
    );
}
