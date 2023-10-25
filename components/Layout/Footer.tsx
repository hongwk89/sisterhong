import CustomImage from '@components/CustomImage';
import useBotNavHeight from '@hooks/store/useBotNavHeight';
import useBtnHeight from '@hooks/store/useBtnHeight';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Footer = () => {
    const { botNavHeight } = useBotNavHeight();
    const { btnHeight } = useBtnHeight();
    const kakaoBtn = useRef<HTMLButtonElement>();

    const KakaoChannelInit = () => {
        try {
            if (!window.Kakao.isInitialized() && window.Kakao) {
                window.Kakao.init(process.env.KAKAO_CLIENT_JAVASCRIPT);
                // createChatButton or chat
                window.Kakao.Channel.createChatButton({
                    container: `#kakaoChannel`,
                    channelPublicId: process.env.KAKAO_CHANNEL_ID
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleKakao = () => {
        const element = kakaoBtn.current.children[0] as HTMLButtonElement;

        element.click();
    };

    const instagram = () => {
        document.location.href = '//www.instagram.com/sisterhong_meat/';
    };

    useEffect(() => {
        KakaoChannelInit();
    }, []);
    return (
        <>
            <footer>
                <div className="links">
                    <ul>
                        <li>
                            <Link href="http://www.miatrading.co.kr/" legacyBehavior>
                                <a target="_blank">회사소개</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/info/policy">
                                <a>이용약관</a>
                            </Link>
                        </li>
                        <li>
                            <Link legacyBehavior href="/info/privateInfo">
                                <a>개인정보처리방침</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="http://www.miatrading.co.kr/page/inquiry" legacyBehavior>
                                <a target="_blank">제휴문의</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="http://www.miatrading.co.kr/page/inquiry" legacyBehavior>
                                <a target="_blank">대량구매문의</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footerContent">
                    <h2>CUSTOMER CENTER</h2>
                    <div className="cs">
                        <p className="kakao" onClick={handleKakao}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/footer/kakao_icon.png`} alt="kakao" width={40} height={40} />
                            </span>
                            <span className="counsel">카카오톡 채널상담 바로가기</span>
                        </p>
                        <p className="phone">
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/footer/telephone.png`} alt="전화" width={40} height={40} />
                            </span>
                            유선상담 :
                            <Link legacyBehavior href="tel:02-6952-0989">
                                <a>02-6952-0989</a>
                            </Link>
                        </p>
                        <p className="notice">
                            유선문의 증가로 인해 연결 및 상담 처리에 어려움이 있습니다.
                            <br />
                            <span>카카오톡 채널상담</span> <b>또는</b> <span>자사몰 내 1:1문의</span>로 남겨주시면
                            <br />
                            더욱 빠르고 친절한 상담 도와드리겠습니다.
                        </p>
                    </div>
                    <div className="workingTime">
                        <h3>고객센터 운영시간</h3>
                        <p>
                            근무시간 : 오전 9시 30분 ~ 오후 5시 30분
                            <br />
                            점심시간 : 오후 12시 ~ 오후 1시
                            <br />
                            (주말 및 공휴일 휴무)
                        </p>
                    </div>
                    <div className="company">
                        <h4>(주) 홍언니고기 푸드</h4>
                        <ul>
                            <li>서울특별시 금천구 두산로13길 31(독산동)</li>
                            <li>사업자등록번호 894-85-02021</li>
                            <li>대표자명 : 홍미애</li>
                            <li>Tel : 02-6952-1232</li>
                            <li>E-mail : info@miatrading.co.kr</li>
                            <li>통신판매업신고번호 제 2022-서울금천-1021호</li>
                        </ul>
                    </div>
                    <div className="sns">
                        {/* <button type="button" className="image" onClick={handleKakao}>
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/footer/kakao.png`} alt="kakao" width={100} height={100} />
                        </button> */}
                        <button type="button" className="image" onClick={instagram}>
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/footer/insta.png`} alt="insta" width={100} height={100} />
                        </button>
                    </div>
                </div>
                <button type="button" id="kakaoChannel" ref={kakaoBtn}></button>
            </footer>
            <style jsx>{`
                $botNavHeight: ${botNavHeight + btnHeight}px;
                $footerMarginBottom: calc($botNavHeight + 2.4rem);
                $borderStyle: 1px solid #e8e8e8;
                @mixin rightBar {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 0.5rem;
                    background: #a2a2a2;
                }
                @mixin lastRightBar {
                    display: none;
                }
                footer {
                    padding-bottom: $footerMarginBottom;
                    .links {
                        border-top: $borderStyle;
                        border-bottom: $borderStyle;
                        ul {
                            display: flex;
                            justify-content: center;
                            li {
                                position: relative;
                                &:after {
                                    @include rightBar;
                                }
                                &:last-child:after {
                                    display: none;
                                }
                                a {
                                    display: block;
                                    padding: 0.75rem;
                                    font-size: 1.2rem;
                                }
                            }
                        }
                    }
                    .footerContent {
                        position: relative;
                        padding: 2rem var(--side-padding) 0;
                        h2 {
                            font-family: 'roboto';
                            font-size: 2rem;
                            color: #000;
                            letter-spacing: 0;
                            font-weight: 700;
                            line-height: 1;
                        }
                        .cs {
                            .phone,
                            .kakao {
                                display: flex;
                                align-items: center;
                                font-size: 1.4rem;
                                gap: 0.8rem;
                                .image {
                                    display: block;
                                    width: 2rem;
                                }
                            }
                            .kakao {
                                margin: 1rem 0 0.5rem;
                                cursor: pointer;
                                .counsel {
                                    font-weight: 700;
                                    color: #391b1b;
                                    font-size: 1.8rem;
                                    border-bottom: 0.15rem solid #391b1b;
                                }
                            }
                            .phone {
                                a {
                                    font-family: 'roboto';
                                    letter-spacing: 0;
                                    border-bottom: 0.1rem solid #191919;
                                    line-height: 1.2;
                                }
                            }
                            .notice {
                                font-size: 1.2rem;
                                margin-top: 0.8rem;
                                span {
                                    color: var(--main-color);
                                    font-weight: 700;
                                }
                                * {
                                    vertical-align: baseline;
                                }
                            }
                        }
                        .workingTime {
                            margin: 2rem 0;
                            h3 {
                                font-weight: 700;
                                font-size: 1.6rem;
                            }
                            p {
                                margin-top: 0.5rem;
                                font-size: 1.2rem;
                            }
                        }
                        .company {
                            h3 {
                                font-weight: 700;
                                font-size: 1.6rem;
                            }
                            h4 {
                                font-size: 1.4rem;
                                font-weight: 500;
                                margin: 0.5rem 0 0.3rem;
                            }
                            ul {
                                display: flex;
                                justify-content: left;
                                flex-wrap: wrap;
                                li {
                                    $space: 0.75rem;
                                    position: relative;
                                    padding-right: $space;
                                    margin-right: $space;
                                    color: #707070;
                                    font-size: 1.2rem;
                                    line-height: 1.6;
                                    &:after {
                                        @include rightBar;
                                    }
                                    &:last-child:after {
                                        display: none;
                                    }
                                }
                            }
                        }
                        .sns {
                            position: absolute;
                            top: 2rem;
                            right: var(--side-padding);
                            .image {
                                display: block;
                                width: 5rem;
                                margin-bottom: 0.5rem;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                    #kakaoChannel {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default Footer;
