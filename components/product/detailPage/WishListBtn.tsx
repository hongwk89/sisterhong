import useTokenStore from '@hooks/store/auth/useTokenStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function WishListBtn({ data }) {
    const router = useRouter();
    const [wish, setWish] = useState(false);
    const { token } = useTokenStore();

    const handleWish = async () => {
        if (token) {
            if (!wish) {
                const config = {
                    method: 'post',
                    url: `${process.env.API_HOST}/wish/set`,
                    data: { product_id: data.product_id }
                };
                const success = () => {
                    setWish(true);
                };
                await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
                return;
            }

            const config = {
                method: 'post',
                url: `${process.env.API_HOST}/wish/delete`,
                data: { product_id: data.product_id }
            };
            const success = () => {
                setWish(false);
            };
            await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });

            kakaoPixel(process.env.KAKAO_PIXEL).addToWishList({
                id: data.product_id
            });

            return;
        }

        if (confirm('로그인이 필요한 서비스입니다. \n로그인 페이지로 이동하시겠습니까?')) {
            router.push('/login?returnUrl=' + router.asPath);
        }
    };

    useEffect(() => {
        if (token) {
            const getWishList = async () => {
                const config = {
                    method: 'get',
                    url: `${process.env.API_HOST}/wish/list/product`,
                    params: { product_id: data.product_id }
                };
                const success = (res) => {
                    if (res !== 0) {
                        setWish(true);
                    }
                };
                await sendAxios({ config, resFunc: success, errFunc: (err) => console.log(err.message) });
            };
            getWishList();
        }
    }, [token]);

    return (
        <>
            <button className={`wrap ${wish ? 'on' : ''}`} type="button" onClick={handleWish}>
                <div className="heart_btn">
                    <svg width="100%" height="100%" viewBox="0 0 40 40" preserveAspectRatio="none">
                        <path
                            d="M4.4,14.976a10.157,10.157,0,0,1,6.028,1.842,9.518,9.518,0,0,1,3.042,3.757,9.408,9.408,0,0,1,3.041-3.758,10.206,10.206,0,0,1,6.043-1.841,9.282,9.282,0,0,1,7.036,3.335,12.21,12.21,0,0,1,2.886,8.054,14.7,14.7,0,0,1-2.88,8.484,38.919,38.919,0,0,1-5.244,5.836l-.482.465A71.254,71.254,0,0,0,14.4,52.425a1.054,1.054,0,0,1-1.853,0A71.248,71.248,0,0,0,3.084,41.152l-.433-.418C-.6,37.6-5.524,32.854-5.524,26.365a12.21,12.21,0,0,1,2.886-8.054A9.282,9.282,0,0,1,4.4,14.976Z"
                            transform="translate(6.524 -13.976)"
                        />
                    </svg>
                </div>
                <div className="circle"></div>
                <div className="particle"></div>
            </button>

            <style jsx>{`
                .wrap {
                    position: relative;
                    width: 4rem;
                    height: 4rem;
                    border-radius: 50%;
                    background: #f8f8fa;
                    .heart_btn {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(1);
                        fill: #c0c0c0;
                        line-height: 0;
                    }
                    .circle {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) scale(0);
                        z-index: 10;
                        width: 4.5rem;
                        height: 4.5rem;
                        border: 2.5rem solid #e51f50;
                        border-radius: 50%;
                        box-sizing: border-box;
                    }
                    .particle {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 11;
                        margin-top: -0.1rem;
                        width: 0.4rem;
                        height: 0.4rem;
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 -2.5rem 0 -0.2rem #97d5fb, 0.55rem -2.5rem 0 -0.2rem #97d5fb, 2rem -1.5em 0 -0.2rem #ce8cef, 2.3rem -1.05rem 0 -0.2rem #ce8cef, 2.5rem 0.65rem 0 -0.2rem #95eccc, 2.25rem 1.15rem 0 -0.2rem #95eccc,
                            1.15rem 2.25rem 0 -0.2rem #f291ad, 0.65rem 2.4rem 0 -0.2rem #f291ad, -1.15rem 2.25rem 0 -0.2rem #97d5fb, -1.6rem 1.9rem 0 -0.2rem #97d5fb, -2.45rem 0.65rem 0 -0.2rem #ce8cef, -2.5rem 0.15rem 0 -0.2rem #ce8cef,
                            -1.95rem -1.6rem 0 -0.2rem #95eccc, -1.55rem -2rem 0 -0.2rem #95eccc;
                    }
                    &.on {
                        .heart_btn {
                            fill: #ef8686;
                            animation: heart 0.7s cubic-bezier(0.3, 1, 0.5, 1.4);
                            will-change: transform;
                        }
                        .circle {
                            animation: circle 0.5s ease-out;
                            will-change: transform, border-width, border-color;
                        }
                        .particle {
                            animation: particles 1s ease-out;
                            will-change: opacity, box-shadow;
                        }
                    }
                }
                @keyframes heart {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    10%,
                    35% {
                        transform: translate(-50%, -50%) scale(0.2);
                    }
                }
                @keyframes circle {
                    0%,
                    25% {
                        transform: translate(-50%, -50%) scale(0);
                        border-width: 2.25rem;
                        border-color: #f36488;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(0.8);
                        border-width: 2.25rem;
                        border-color: #f15e5e;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        border-width: 0;
                        border-color: #e287dd;
                    }
                }
                @keyframes particles {
                    0%,
                    30% {
                        opacity: 0;
                    }
                    31% {
                        opacity: 1;
                        box-shadow: 0 -2rem 0 0 #ff8080, 0.5rem -1.8rem 0 0 #ffed80, 1.6rem -1.2rem 0 0 #ffed80, 1.55rem -0.6rem 0 0 #a4ff80, 1.95rem 0.5rem 0 0 #a4ff80, 1.45rem 0.85rem 0 0 #80ffc8, 0.9rem 1.8rem 0 0 #80ffc8,
                            0.3rem 1.65rem 0 0 #80c8ff, -0.9rem 1.8rem 0 0 #80c8ff, -1.15rem 1.2rem 0 0 #a480ff, -1.95rem 0.5rem 0 0 #a480ff, -1.65rem -0.05rem 0 0 #ff80ed, -1.55rem -1.25rem 0 0 #ff80ed, -0.95rem -1.35rem 0 0 #ff8080;
                    }
                }
            `}</style>
        </>
    );
}
