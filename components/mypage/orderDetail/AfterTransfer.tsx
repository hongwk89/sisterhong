import sendAxios from 'utils/sendAxios';

export default function AfterTransfer({ data }) {
    const bank_transfer = async () => {
        const config = { method: 'get', url: `${process.env.API_HOST}/order/cash-bill/${data.order_id}` };

        await sendAxios({
            config,
            resFunc: (res) => {
                window.open(res.data.url);
            },
            errFunc: (err) => alert(err.message)
        });
    };

    const virtual_account = async () => {
        window.open(data.payment_info.cash_receipt_url);
    };

    const receipt = async () => {
        if (data.payment_method === '무통장입금') {
            bank_transfer();
            return;
        }

        virtual_account();
    };

    return (
        <>
            <div className="grid">
                <span className="key">결제수단</span>
                <span className="val">{data.payment_method}</span>
                <span className="key">현금영수증</span>
                {data.cash_receipt !== 'NotNeeded' ? (
                    data.cash_receipt === 'Done' ? (
                        <div className="val">
                            <span>발행({data.cash_receipt_trade === 'I' ? '소득공제용' : '지출증빙용'})</span>
                            <br />
                            <button type="button" className="receiptBtn" onClick={receipt}>
                                영수증확인
                            </button>
                        </div>
                    ) : (
                        <p className="val">배송이 완료되면 발행됩니다</p>
                    )
                ) : (
                    <span className="val">미발행</span>
                )}
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
                        .receiptBtn {
                            display: inline-block;
                            margin-top: 0.5rem;
                            width: 6.5rem;
                            height: 2.5rem;
                            background: #eee;
                            color: #000;
                            border-radius: 0.5rem;
                            font-size: 1rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
