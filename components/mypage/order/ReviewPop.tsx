import { review_pop_option } from '@components/cart/CartListOne';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';

const REVIEW_STATE = {
    0: '구매평작성',
    1: '기한만료',
    2: '작성완료'
};

export default function ReviewPop({ data, popData, popOn, popClose }) {
    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className="pop fade">
                    <h1>
                        구매옵션선택
                        <button type="button" className="close" onClick={popClose}>
                            <span className="hidden">닫기</span>
                        </button>
                    </h1>
                    <div className="content">
                        <ul>
                            {data.map((list: review_pop_option, idx: number) => (
                                <li key={idx}>
                                    <div className="image">
                                        <CustomImage src={popData.image.path} width={popData.image.width} height={popData.image.height} alt={popData.product_name} priority={true} />
                                    </div>
                                    <div className="info">
                                        <h3>{popData.product_name}</h3>
                                        <p>{list.group}</p>
                                    </div>
                                    {list.review_state === 0 ? (
                                        <Link legacyBehavior href={`/mypage/review/write?order_id=${popData.order_id}&option_idx=${list.ordered_options_idx}`}>
                                            <a className="btn active">{REVIEW_STATE[list.review_state]}</a>
                                        </Link>
                                    ) : (
                                        <button type="button" className="btn" disabled>
                                            {REVIEW_STATE[list.review_state]}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .pop {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    background: #fff;
                    h1 {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 4.5rem;
                        padding: 0 var(--side-padding-inner);
                        font-size: 1.8rem;
                        font-weight: 500;
                        background: #f8f8fa;
                        .close {
                            @include mixins.closeBtn(2.5rem, 0.25rem, #a2a2a2);
                        }
                    }
                    .content {
                        padding: 2rem 1.5rem;
                        ul {
                            li {
                                display: flex;
                                justify-content: space-between;
                                gap: 2rem;
                                align-items: center;
                                background: #f8f8fa;
                                padding: 1rem 1.5rem;
                                margin-bottom: 2rem;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .image {
                                    flex-shrink: 0;
                                    width: 9rem;
                                    height: 9rem;
                                }
                                .info {
                                    text-align: left;
                                    margin-right: auto;
                                    h3 {
                                        font-size: 1.6rem;
                                        font-weight: 700;
                                        line-height: 1.2;
                                        margin-bottom: 0.5rem;
                                    }
                                    p {
                                        font-size: 1.2rem;
                                    }
                                }
                                .btn {
                                    flex-shrink: 0;
                                    display: block;
                                    width: 7rem;
                                    height: 3rem;
                                    line-height: 3rem;
                                    text-align: center;
                                    background: #e8e8e8;
                                    font-size: 1.2rem;
                                    color: #a2a2a2;
                                    font-weight: 500;
                                    &.active {
                                        background: var(--main-color);
                                        color: #fff;
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
