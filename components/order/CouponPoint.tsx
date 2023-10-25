import Coupon from './CouponPoint/Coupon';
import CouponCode from './CouponPoint/CouponCode';
import Point from './CouponPoint/Point';

export default function CouponPoint({ data, time, params, setParams }) {
    return (
        <>
            <div className="couponPoint">
                <ul>
                    <li>
                        <h3>쿠폰</h3>
                        <Coupon data={data.coupons.coupons} time={time} params={params} setParams={setParams} />
                    </li>
                    <li>
                        <h3>쿠폰코드</h3>
                        <CouponCode params={params} setParams={setParams} />
                    </li>
                    <li>
                        <h3>적립금</h3>
                        <Point point={data.user.point} params={params} setParams={setParams} />
                    </li>
                </ul>
            </div>
            <style jsx global>{`
                .couponPoint {
                    .discount {
                        flex-basis: 100%;
                        padding-left: 1rem;
                        color: #707070;
                        font-size: 1.4rem;
                        font-weight: 500;
                        margin-top: 0.5rem;
                        span {
                            font-weight: 700;
                            color: #000;
                            vertical-align: baseline;
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                li {
                    h3 {
                        font-size: 1.6rem;
                        font-weight: 500;
                        margin-bottom: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
