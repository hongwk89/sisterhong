import Link from 'next/link';
import convertPrice from 'utils/convertPrice';

export default function UserInfoTab({ data }) {
    return (
        <>
            <span className="col">리뷰</span>
            <span>
                <Link href="/mypage/review" passHref>
                    <u>{data.review}건</u>
                </Link>
            </span>
            <span className="border col">적립급</span>
            <span className="border">
                <Link href="/mypage/point" passHref>
                    <u>{convertPrice(data.point)}원</u>
                </Link>
            </span>
            <span className="col">쿠폰</span>
            <span>
                <Link href="/mypage/coupon" passHref>
                    <u>{data.coupon}장</u>
                </Link>
            </span>
            <style jsx>{`
                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.4rem;
                    font-weight: 500;
                    &.col {
                        background: #f8f8fa;
                    }
                    &.border {
                        border-left: 1px solid #e8e8e8;
                        border-right: 1px solid #e8e8e8;
                    }
                }
            `}</style>
        </>
    );
}
