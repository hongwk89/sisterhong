import convertPrice from 'utils/convertPrice';

export default function PaymentInfo({ data, payment, status }) {
    return (
        <>
            <div className={`wrap ${status === 600 ? 'cancel' : ''}`}>
                <h3>주문금액</h3>
                <div className="grid">
                    <span className="key">상품금액</span>
                    <span className="val">{convertPrice(data.original_price)}원</span>
                    <span className="key">배송비</span>
                    <span className="val">{convertPrice(data.shipping_fee + data.shipping_surcharge)}원</span>
                </div>
                <h3>할인금액</h3>
                <div className="grid">
                    <span className="key">상품할인</span>
                    <span className="val">- {convertPrice(data.promotion)}원</span>
                    <span className="key">쿠폰사용</span>
                    <span className="val">- {convertPrice(data.coupon + data.serial)}원</span>
                    <span className="key">적립금사용</span>
                    <span className="val">- {convertPrice(data.point)}원</span>
                </div>
                <div className="flex">
                    <h3>최종결제금액</h3>
                    <span>{convertPrice(payment)}원</span>
                </div>
            </div>

            <style jsx>{`
              .wrap {
                padding: 1.5rem var(--side-padding-inner);

                h3 {
                  display: inline-block;
                  padding-bottom: 0.1rem;
                  margin-bottom: 1rem;
                  border-bottom: 1px solid #000;
                  color: #000;
                  font-size: 1.4rem;
                  font-weight: 500;
                }

                .grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 1.2rem 0.5rem;
                  margin-bottom: 2rem;

                  .key {
                    font-size: 1.4rem;
                    color: #767676;
                  }

                  .val {
                    font-size: 1.6rem;
                    text-align: right;
                  }

                  .val {
                    font-size: 1.6rem;
                    text-align: right;
                  }
                }

                .flex {
                  display: flex;
                  justify-content: space-between;

                  h3 {
                    color: var(--main-color);
                    border-color: var(--main-color);
                  }

                  span {
                    font-size: 1.6rem;
                    color: var(--main-color);
                  }
                }

                &.cancel {
                  .val, .flex span{
                    text-decoration: line-through;
                  }
                }
              }
            `}</style>
        </>
    );
}
