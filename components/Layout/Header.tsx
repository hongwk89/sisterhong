import CustomImage from '@components/CustomImage';
import useTokenStore from '@hooks/store/auth/useTokenStore';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
    const { token } = useTokenStore();

    return (
        <>
            <header>
                {!token && (
                    <div className="top_banner">
                        <Link legacyBehavior href="/login">
                            <a>지금 가입하면 신규회원 적립금 2,000원 바로지급!</a>
                        </Link>
                    </div>
                )}
                <div className="main">
                    <Link legacyBehavior href="/">
                        <a className="logo">
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/logo.png`} alt="홍언니고기 로고" width={120} height={106} />
                        </a>
                    </Link>
                </div>
                <Nav />
            </header>
            <style jsx>{`
                header {
                    background: #fff;
                    .top_banner {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--main-color);
                        height: 3rem;
                        text-align: center;
                        a {
                            color: #fff;
                            font-size: 1.4em;
                            line-height: 1;
                            vertical-align: top;
                        }
                    }
                    .main {
                        position: relative;
                        text-align: center;
                        padding: 1rem;
                        a {
                            display: block;
                            margin: 0 auto;
                            &.logo {
                                width: 18%;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
};

export default Header;
