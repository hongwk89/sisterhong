import useGetPath from '@hooks/useGetPath';
import Link from 'next/link';
import convertPrice from 'utils/convertPrice';
import initMenu from 'utils/initMenu';
import Timer from './Timer';
import Brands from '@components/Brands';
import Thumbnail from './Thumbnail';

export default function ProductList({ idx = '', list, type = 'defaultPage', timer = null, deleteWish = null }) {
    const url = useGetPath();

    const checkLink = (e: React.TouchEvent | React.MouseEvent) => {
        const href = (e.currentTarget as HTMLAnchorElement).href;

        if (href.includes(url)) {
            initMenu();
        }
    };

    return (
        <>
            <li className={type} data-idx={idx}>
                <Link legacyBehavior href={`/products/detailPage/${list.product_id}`}>
                    <a onClick={checkLink}>
                        <Thumbnail data={list} type={type} />
                        <div className="bottomInfo">
                            <Brands data={list.brand} />
                            {type === 'salePage' && list.promotion_end_date && <Timer startDay={timer} endDay={list.promotion_end_date} />}
                            <span className="name">{list.name}</span>
                            <span className="price_area">
                                {list.state === 4 && <span className="soldOut">상품준비중</span>}
                                {list.state === 2 && <span className="soldOut">품절</span>}
                                {list.state === 1 && list.inventory < 10 && <span className="soldOut few">남은수량 {list.inventory}개</span>}
                                <span className="price">
                                    {list.price !== list.min_price && <span className="originalPrice">{convertPrice(list.price)}원</span>}
                                    <span className="salePrice">
                                        {convertPrice(list.min_price)}원{list.single_options !== 1 && <span className="wave">~</span>}
                                    </span>
                                </span>
                            </span>
                        </div>
                    </a>
                </Link>
                {type.includes('wishList') && (
                    <button type="button" className="deleteBtn" onClick={() => deleteWish(list.product_id)}>
                        <span className="hidden">위시리스트삭제</span>
                    </button>
                )}
            </li>
            <style jsx>{`
                @use 'styles/mixins';
                li {
                    a {
                        display: block;
                        span {
                            display: block;
                        }
                        .bottomInfo {
                            position: relative;
                            .name {
                                word-break: keep-all;
                                height: 6rem;
                                font-weight: 500;
                                color: #000;
                            }
                            .price_area {
                                position: relative;
                                .soldOut {
                                    position: absolute;
                                    bottom: 100%;
                                    right: 0;
                                    font-size: 1rem;
                                    line-height: 1;
                                    font-weight: 700;
                                    color: #e00f00;
                                    &:not(.few) + .price .salePrice {
                                        color: #a2a2a2;
                                    }
                                }
                                .price {
                                    position: relative;
                                    display: flex;
                                    align-items: baseline;
                                    justify-content: right;
                                    font-weight: 700;
                                    line-height: 1.2;
                                    .originalPrice {
                                        font-weight: 400;
                                        color: #a2a2a2;
                                        text-decoration: line-through;
                                    }
                                    .salePrice {
                                        .wave {
                                            display: inline-block;
                                            vertical-align: 0.7rem;
                                            font-size: 1rem;
                                            margin-left: 0.1rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &.defaultPage {
                        position: relative;
                        a {
                            .bottomInfo {
                                .name {
                                    font-size: 1.6rem;
                                }
                                .price_area {
                                    font-size: 1.7rem;
                                    .price {
                                        .originalPrice {
                                            font-size: 1.1rem;
                                            margin-right: 0.3rem;
                                        }
                                    }
                                }
                            }
                        }
                        .deleteBtn {
                            @include mixins.closeBtn(0.8rem, 0.1rem);
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                            z-index: 15;
                            background: #fff;
                            border-radius: 50%;
                            width: 2rem;
                            height: 2rem;
                            border: 0.1rem solid var(--main-color);
                        }
                    }
                    &.salePage {
                        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
                        padding-bottom: 1.5rem;
                        margin-bottom: 4rem;
                        a {
                            .bottomInfo {
                                padding: 1.5rem var(--side-padding-inner) 0;
                                .name {
                                    margin-bottom: 1.2rem;
                                    font-size: 2rem;
                                }
                                .price_area {
                                    .soldOut {
                                        font-size: 1.4rem;
                                    }
                                    .price {
                                        font-size: 2.6rem;
                                        .originalPrice {
                                            margin-right: 1rem;
                                            font-size: 1.8rem;
                                            font-weight: 400;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
