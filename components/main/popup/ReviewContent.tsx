import CustomImage from '@components/CustomImage';
import Link from 'next/link';

export default function ReviewContent({ data, length }) {
    return (
        <>
            <h1>
                홍언니고기와
                <br />
                즐거운 식사되셨나요?
            </h1>
            <p className="text">구매평 작성하시고 적립금 받아가세요!</p>
            <p className="text">
                키워드구매평 <b>100원</b>, 텍스트구매평 <b>200원</b>,<br />
                포토구매평은 <b>400원</b> 적립!
            </p>
            <div className="product">
                <span className="image">
                    <CustomImage src={data.img} alt="" width={data.img_width} height={data.img_height} priority={true} />
                </span>
                <p>{data.product_name}</p>
                <p>{data.option_name}</p>
                <p>{data.delivered_at} 배송완료</p>
            </div>
            <Link legacyBehavior href={`/mypage/review/write/?order_id=${data.order_id}&option_idx=${data.ordered_option_idx}`}>
                <a className="btn">
                    <span className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/pencil.png`} alt="" width={36} height={36} priority={true} />
                    </span>
                    구매평 작성하기
                </a>
            </Link>
            <Link legacyBehavior href="/mypage/review">
                <a className="btn">
                    작성가능한 구매평 <span>{length}건</span>
                </a>
            </Link>
            <style jsx>{`
                h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 2rem 0;
                }
                .text {
                    &:nth-of-type(1) {
                        font-size: 1.6rem;
                        font-weight: 500;
                        color: var(--main-color);
                        margin-bottom: 0.5rem;
                    }
                    &:nth-of-type(2) {
                        position: relative;
                        font-size: 1.4rem;
                        line-height: 1.8;
                        b {
                            position: relative;
                            display: inline-block;
                            font-weight: 700;
                            vertical-align: baseline;
                            &:after {
                                content: '';
                                display: block;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-48%, -50%);
                                width: 5rem;
                                height: 3.2rem;
                                background: url(https://i.sisterhong.xyz/public/images/circle.png) no-repeat 0 0;
                                background-size: 100%;
                            }
                        }
                        .image {
                            display: block;
                            position: absolute;
                            top: -0.8rem;
                            left: 50%;
                            width: 5rem;
                            transform: translateX(-88%);
                            &:nth-of-type(2) {
                                transform: translateX(153%);
                            }
                        }
                    }
                }
                .product {
                    margin-top: 1rem;
                    .image {
                        display: block;
                        margin: 0 auto;
                        width: 9rem;
                        height: 9rem;
                        margin-bottom: 0.4rem;
                    }
                    p {
                        &:nth-of-type(1) {
                            font-size: 1.4rem;
                            font-weight: 700;
                        }
                        &:nth-of-type(2) {
                            font-size: 1.2rem;
                            font-weight: 500;
                        }
                        &:nth-of-type(3) {
                        }
                    }
                }
                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:nth-of-type(1) {
                        background: var(--main-color);
                        margin: 0 auto;
                        color: #fff;
                        font-weight: 500;
                        font-size: 1.6rem;
                        width: 15rem;
                        height: 3.5rem;
                        margin-top: 0.5rem;
                        gap: 0.5rem;
                        .image {
                            display: block;
                            width: 1.8rem;
                            height: 1.8rem;
                            line-height: 0;
                        }
                    }
                    &:nth-of-type(2) {
                        display: inline-flex;
                        margin-top: 2rem;
                        font-size: 1.4rem;
                        border-bottom: 0.1rem solid #191919;
                        gap: 0.5rem;
                        margin-bottom: 2rem;
                        span {
                            font-weight: 700;
                        }
                    }
                }
            `}</style>
        </>
    );
}
