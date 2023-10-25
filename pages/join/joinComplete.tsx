import CheckData from '@components/CheckData';
import CustomImage from '@components/CustomImage';
import PageTitle from '@components/PageTitle';
import useNaverCB from '@hooks/store/useNaverCB';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import friendShare from 'utils/friendShare';
import sendAxios from 'utils/sendAxios';

export default function JoinComplete() {
    const [data, setData] = useState(null);
    const codeRef = useRef<HTMLSpanElement>();
    const router = useRouter();

    const handleShare = async () => {
        const code = codeRef.current.innerText;

        friendShare(`추천인코드(${code})가 적용된 주소가`, `${process.env.DOMAIN}/login?code=${code}`);
    };

    useEffect(() => {
        const getName = async () => {
            const config = { method: 'get', url: `${process.env.API_HOST}/auth/user-info/` };
            const data = await sendAxios({ config });

            setData(data);
        };

        getName();

        // 카카오
        kakaoPixel(process.env.KAKAO_PIXEL).completeRegistration();

        //네이버
        if (window.wcs) useNaverCB.setState({ _nasa: { cnv: wcs.cnv('2', '0') } });
        useNaverCB.setState({ check: true });
    }, []);

    return (
        <>
            <PageTitle title="홍언니고기 - 회원가입완료" />
            {data && (
                <CheckData data={data}>
                    {data.state === 'success' && (
                        <div className="wrap">
                            <span className="bigCheck">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/bigCheck.png`} alt="" width={80} height={80} />
                            </span>
                            <h3>{data.data.user_name} 고객님</h3>
                            <p>홍언니고기의 회원이 되신 걸 환영합니다!</p>
                            <div>
                                <p>
                                    <span className="icon">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/check.png`} alt="" width={43} height={30} />
                                    </span>
                                    신규회원가입 <span>적립금 2,000원</span> 즉시 지급완료!
                                </p>
                                <p>
                                    <span className="icon">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/check.png`} alt="" width={43} height={30} />
                                    </span>
                                    회원님의 추천인코드 : <span ref={codeRef}>{data.data.user_code}</span>
                                    <button type="button" onClick={handleShare}>
                                        공유하기
                                    </button>
                                </p>
                            </div>
                            <Link legacyBehavior href={router.query.returnUrl ? (router.query.returnUrl as string) : '/'}>
                                <a>쇼핑하러가기</a>
                            </Link>
                        </div>
                    )}
                </CheckData>
            )}
            <style jsx>{`
                .wrap {
                    text-align: center;
                    padding: 4rem 0;
                    .bigCheck {
                        display: block;
                        width: 4rem;
                        height: 4rem;
                        margin: 0 auto 1.2rem;
                    }
                    h3 {
                        font-size: 2.2rem;
                        color: #000;
                        font-weight: bold;
                    }
                    > p {
                        font-size: 1.8rem;
                        margin-top: 0.5rem;
                        color: #707070;
                        margin-bottom: 4rem;
                    }
                    > div {
                        > p {
                            font-size: 1.6rem;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            &:first-child {
                                margin-bottom: 1.2rem;
                            }
                            .icon {
                                display: block;
                                width: 1.5rem;
                                height: 1rem;
                                line-height: 0;
                                margin-right: 0.5rem;
                            }
                            span:not(.icon) {
                                display: block;
                                padding: 0 5px;
                                font-weight: 700;
                            }
                            button {
                                display: block;
                                padding: 0.5rem 0.75rem;
                                background: #f8f8fa;
                                color: #9a9a9a;
                                font-size: 1.4rem;
                                box-shadow: 0.1rem 0.1rem 0 0 rgba(0, 0, 0, 0.08);
                                margin-left: 0.5rem;
                            }
                        }
                    }
                    > a {
                        display: block;
                        margin: 0 auto;
                        width: 16rem;
                        padding: 1rem 0;
                        color: #fff;
                        font-weight: 500;
                        font-size: 2rem;
                        background: var(--main-color);
                        margin-top: 5rem;
                        line-height: 1;
                    }
                }
            `}</style>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = { method: 'get', url: `${process.env.API_HOST}/auth/user-info/` };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
