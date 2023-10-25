import CustomImage from '@components/CustomImage';
import useGetPath from '@hooks/useGetPath';
import Link from 'next/link';
import initMenu from 'utils/initMenu';

export default function MenuList() {
    const url = useGetPath();

    const checkLink = (e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.href;

        if (href.includes(url)) {
            initMenu();
        }
    };

    return (
        <>
            <ul className="products">
                <li>
                    <Link legacyBehavior href="/products/beef">
                        <a onClick={checkLink}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/menu/cow.png`} alt="소고기" width={120} height={120} />
                            </span>
                            <span className="text">소고기</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/products/lamb">
                        <a onClick={checkLink}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/menu/sheep.png`} alt="양고기" width={120} height={120} />
                            </span>
                            <span className="text">양고기</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/products/premium">
                        <a onClick={checkLink}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/menu/diamond.png`} alt="프리미엄" width={120} height={120} />
                            </span>
                            <span className="text">프리미엄</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/products/combo">
                        <a onClick={checkLink}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/menu/set.png`} alt="세트상품" width={120} height={120} />
                            </span>
                            <span className="text">세트상품</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/products/gift">
                        <a onClick={checkLink}>
                            <span className="image">
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/menu/gift.png`} alt="선물세트" width={120} height={120} />
                            </span>
                            <span className="text">선물세트</span>
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className="others">
                <li>
                    <Link legacyBehavior href="/notice">
                        <a onClick={checkLink}>공지사항</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/oftenAsk">
                        <a onClick={checkLink}>자주 묻는 질문</a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="/mypage/contact">
                        <a onClick={checkLink}>1:1 문의</a>
                    </Link>
                </li>
            </ul>
            <style jsx>{`
                .products {
                    display: grid;
                    justify-content: space-between;
                    row-gap: 2rem;
                    margin-bottom: 2rem;
                    padding: 0 var(--side-padding-inner);
                    $n: 3;
                    @for $i from 1 through $n {
                        li:nth-child(#{$i}) {
                            grid-column: #{$i} / auto;
                        }
                    }
                    li {
                        text-align: center;
                        a {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .image {
                                display: block;
                                width: 6rem;
                            }
                            .text {
                                display: block;
                                margin-top: 1.5rem;
                                font-size: 2rem;
                                font-weight: 500;
                                &.prepare {
                                    color: #e8e8e8;
                                }
                            }
                            &.disabled {
                                pointer-events: none;
                            }
                        }
                    }
                }
                .others {
                    padding: 2rem var(--side-padding-inner) 2.5rem;
                    border-top: 0.1rem solid #e8e8e8;
                    li {
                        font-size: 1.8rem;
                        margin-bottom: 1.5rem;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            `}</style>
        </>
    );
}
