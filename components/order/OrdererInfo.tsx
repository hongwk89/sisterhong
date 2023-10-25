import toPhoneForm from 'utils/toPhoneForm';

export default function OrdererInfo({ type = null, data }) {
    return (
        <>
            {type === 'dest' ? (
                <div>
                    <span className="key">수령인</span>
                    <span className="val">{data.receiver_name}</span>
                    <span className="key">연락처</span>
                    <span className="val">{toPhoneForm(data.receiver_phone)}</span>
                    <span className="key">배송지</span>
                    <span className="val">
                        {data.receiver_address} {data.receiver_address_detail}
                    </span>
                    <span className="key">배송메모</span>
                    <span className="val">{data.shipping_message}</span>
                    <span className="key">요청사항</span>
                    <span className="val">{data.requirement}</span>
                </div>
            ) : (
                <div>
                    <span className="key">주문자</span>
                    <span className="val">{data.user_name ? data.user_name : '-'}</span>
                    <span className="key">연락처</span>
                    <span className="val">{data.phone ? toPhoneForm(data.phone) : '-'}</span>
                    <span className="key">이메일</span>
                    <span className="val">{data.user_id ? data.user_id : '-'}</span>
                </div>
            )}

            <style jsx>{`
                div {
                    display: grid;
                    grid-template-columns: 7rem 1fr;
                    gap: 1.2rem 0.5rem;
                    padding: 1.5rem var(--side-padding-inner);
                    .key {
                        font-size: 1.6rem;
                        color: #767676;
                    }
                    .val {
                        font-size: 1.4rem;
                    }
                }
            `}</style>
        </>
    );
}
