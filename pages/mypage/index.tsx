import CheckData from '@components/CheckData';
import RankPopup from '@components/mypage/main/RankPopup';
import MypageTitle from '@components/mypage/MypageTitle';
import Processing from '@components/mypage/Processing';
import UserInfo from '@components/mypage/UserInfo';
import UserInfoTab from '@components/mypage/UserInfoTab';
import CustomImage from '@components/CustomImage';
import usePopToggle from '@hooks/usePopToggle';
import Link from 'next/link';
import sendAxios from 'utils/sendAxios';
import PageTitle from '@components/PageTitle';
import signOut from 'utils/signOut';
import { useRouter } from 'next/router';

const LINKS = [
    { name: '주문조회', href: '/mypage/order', icon: 'order' },
    { name: '적립금', href: '/mypage/point', icon: 'point' },
    { name: '쿠폰', href: '/mypage/coupon', icon: 'coupon' },
    { name: '1:1문의', href: '/mypage/contact', icon: 'contact' },
    // { name: '구매스탬프', href: '/mypage/stamp', icon: 'stamp' },
    { name: '위시리스트', href: '/mypage/wishlist', icon: 'wishlist' },
    { name: '구매평 관리', href: '/mypage/review', icon: 'review' },
    { name: '배송지관리', href: '/mypage/address', icon: 'shipment' },
    { name: '정보관리', href: '/mypage/info', icon: 'info' }
];

const RANKCOLORS = { family: '#56ae33', silver: '#aaa', gold: '#e9b003', vip: '#e00f00' };

export default function Mypage({ data }) {
    const router = useRouter();
    const { popOn, popOpen, popClose } = usePopToggle();

    return (
        <>
            <PageTitle title="홍언니고기 - 마이페이지" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <div className="mypage">
                            <MypageTitle>마이페이지</MypageTitle>
                            <div className="userInfo">
                                <UserInfo data={data.data} rankColor={RANKCOLORS} popOpen={popOpen} />
                            </div>
                            <div className="UserInfoTab">
                                <UserInfoTab data={data.data} />
                            </div>
                            <div className="processing">
                                <Processing data={data.data} />
                            </div>
                            <div className="links">
                                <ul>
                                    {LINKS.map((val, idx) => (
                                        <li key={idx}>
                                            <Link legacyBehavior href={val.href}>
                                                <a>
                                                    <span className={`icon ${val.icon}`}></span>
                                                    {val.name}
                                                    <span className="arrow"></span>
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="logout">
                                <button type="button" onClick={() => signOut(router)}>
                                    로그아웃
                                    <span className="image">
                                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/logout.png`} width={10} height={10} alt="로그아웃" />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <RankPopup data={data.data} rankColor={RANKCOLORS} popOn={popOn} popClose={popClose} />
                        <style jsx>{`
                            @use 'styles/mixins';
                            $icon_size: 1.8rem;
                            .mypage {
                                padding: 0 var(--side-padding);
                                .userInfo {
                                    display: flex;
                                    justify-content: left;
                                    align-items: center;
                                    gap: 1.2rem;
                                    margin-bottom: 3rem;
                                }
                                .UserInfoTab {
                                    display: grid;
                                    grid-template-columns: 1fr 1fr 1fr;
                                    grid-template-rows: repeat(2, 3.6rem);
                                    grid-auto-flow: column;
                                    margin-top: 3rem;
                                    box-shadow: 0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.05);
                                }
                                .processing {
                                    margin-top: 3rem;
                                }
                                .links {
                                    margin-top: 2rem;
                                    li {
                                        padding: 1rem 0 1rem 1.5rem;
                                        border-bottom: 1px solid #e8e8e8;
                                        a {
                                            display: flex;
                                            justify-content: left;
                                            align-items: center;
                                            font-size: 1.6rem;
                                            font-weight: 500;
                                            .icon {
                                                display: block;
                                                width: $icon_size;
                                                height: $icon_size;
                                                margin-right: 1rem;
                                                background: url(${process.env.AWS_IMAGE_URL}/images/mypage_Icons.png) 0 0 no-repeat;
                                                background-size: 100% auto;
                                                &.point {
                                                    background-position-y: -$icon_size;
                                                }
                                                &.coupon {
                                                    background-position-y: -$icon_size * 2;
                                                }
                                                &.contact {
                                                    background-position-y: -$icon_size * 3;
                                                }
                                                &.stamp {
                                                    background-position-y: -$icon_size * 4;
                                                }
                                                &.wishlist {
                                                    background-position-y: -$icon_size * 5;
                                                }
                                                &.review {
                                                    background-position-y: -$icon_size * 6;
                                                }
                                                &.shipment {
                                                    background-position-y: -$icon_size * 7;
                                                }
                                                &.info {
                                                    background-position-y: -$icon_size * 8;
                                                }
                                            }
                                            .arrow {
                                                display: block;
                                                position: relative;
                                                width: 3rem;
                                                height: 3rem;
                                                margin-left: auto;
                                                @include mixins.arrow(0.7rem, 0.1rem, 45deg, right);
                                            }
                                        }
                                    }
                                }
                                .logout {
                                    padding: 1rem 0 3rem;
                                    text-align: right;
                                    button {
                                        display: inline-flex;
                                        align-items: center;
                                        color: #707070;
                                        font-size: 1.2rem;
                                        font-weight: 500;
                                        line-height: 1;
                                        .image {
                                            display: block;
                                            width: 1rem;
                                            line-height: 0;
                                            margin-left: 0.5rem;
                                        }
                                    }
                                }
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/auth/user/info`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
