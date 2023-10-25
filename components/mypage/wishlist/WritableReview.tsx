import Brands from '@components/Brands';
import CustomImage from '@components/CustomImage';
import Link from 'next/link';

export default function WritableReview({ data }) {
    return (
        <>
            <li>
                <span className="image">
                    <CustomImage src={data.img} width={180} height={180} alt={data.option_name} />
                </span>
                <div className="info">
                    <Brands data={data.brand} />
                    <h5>{data.option_name}</h5>
                    <p>구매평 작성기한 : {data.write_until}</p>
                    <div className="btns">
                        <Link legacyBehavior href={`/products/detailPage/${data.product_id}`}>
                            <a className={`commonButton typeWhite ${data.product_state === 0 ? 'unable' : ''}`}>상품바로가기</a>
                        </Link>
                        {data.expired ? (
                            <button type="button" className="disabled">
                                작성기간만료
                            </button>
                        ) : (
                            <Link legacyBehavior href={`/mypage/review/write?order_id=${data.order_id}&option_idx=${data.ordered_options_idx}`}>
                                <a className="commonButton typeRed">구매평작성</a>
                            </Link>
                        )}
                    </div>
                </div>
            </li>
            <style jsx>{`
                li {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    background: #fff;
                    margin-bottom: 0.6rem;
                    .image {
                        width: 9rem;
                        height: 9rem;
                        display: block;
                    }
                    .info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: calc(100% - 10.5rem);
                        h5 {
                            font-size: 1.6rem;
                            font-weight: 700;
                        }
                        p {
                            font-size: 1.2rem;
                            color: #707070;
                            font-weight: 500;
                            margin: 0.4rem 0 0.8rem;
                        }
                        .btns {
                            display: flex;
                            justify-content: right;
                            gap: 0.7rem;
                            a {
                                display: block;
                                width: auto;
                                border-radius: 0;
                                font-size: 1.2rem;
                                padding: 0.6rem 1rem;
                                &.unable {
                                    background: #a2a2a2;
                                    color: #e8e8e8;
                                    pointer-events: none;
                                    border: 0;
                                }
                            }
                            .disabled {
                                background: #e8e8e8;
                                color: #a2a2a2;
                                font-size: 1.2rem;
                                padding: 0.6rem 1rem;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
