import AfterTransfer from './AfterTransfer';
import BeforeTransfer from './BeforeTransfer';

export default function MypagePaymentMethod({ data }) {
    return (
        <>
            {['무통장입금', '가상계좌'].includes(data.payment_method) ? (
                <>{data.status === '입금대기' ? <BeforeTransfer data={data} /> : <AfterTransfer data={data} />}</>
            ) : (
                <>
                    <div className="grid">
                        <span className="key">결제수단</span>
                        <span className="val">{data.payment_method}</span>
                        <span className="key">적립금액</span>
                        <span className="val">0원</span>
                    </div>
                    <style jsx>{`
                        .grid {
                            padding: 1.5rem var(--side-padding-inner);
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 1.2rem 0.5rem;
                            margin-bottom: 2rem;
                            .key {
                                font-size: 1.4rem;
                                color: #767676;
                            }
                            .val {
                                font-size: 1.4rem;
                                text-align: right;
                            }
                        }
                    `}</style>
                </>
            )}
        </>
    );
}
