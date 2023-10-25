import convertPrice from 'utils/convertPrice';

export default function BeforeTransfer({ data }) {
    return (
        <>
            <div className="wrap fullwd">
                <p>
                    하단의 계좌정보로 송금하시면 <b>결제완료</b> 처리됩니다.
                </p>
                <div className="bankTransfer">
                    <span className="key">송금계좌</span>
                    <div className="method">
                        <span>
                            {data.payment_info.payment_method === '무통장입금' ? (
                                <>
                                    {process.env.SISTER_HONG_BANK_NAME} {process.env.SISTER_HONG_BANK}
                                </>
                            ) : (
                                <>
                                    {data.payment_info.bank.name} {data.payment_info.bank.accountNumber}
                                </>
                            )}
                        </span>
                        <br />
                        <span>주식회사 홍언니고기 푸드</span>
                        <br />
                        <span>{data.cash_receipt === 'NotNeeded' ? '현금영수증 신청안함' : '현금영수증 신청'}</span>
                    </div>
                    <span className="price_text key red">결제금액</span>
                    <span className="price red">{convertPrice(data.payment_amount)}원</span>
                </div>
            </div>
            <style jsx>{`
                .wrap {
                    padding-bottom: 2rem;
                    > p {
                        margin: 1rem 0;
                        font-size: 1.4rem;
                        font-weight: 500;
                        text-align: center;
                        color: #707070;
                        b {
                            vertical-align: baseline;
                            color: #000;
                        }
                    }
                    .bankTransfer {
                        display: grid;
                        grid-template-columns: 8rem auto;
                        grid-template-rows: repeat(2, auto);
                        margin: 0 var(--side-padding);
                        border: 0.1rem solid #ddd;
                        > * {
                            display: block;
                            padding: 1.5rem;
                        }
                        .key {
                            display: flex;
                            align-items: center;
                            height: 100%;
                            background: #f8f8fa;
                            color: #767676;
                            font-size: 1.4rem;
                            text-align: center;
                        }
                        .red {
                            color: var(--main-color);
                        }
                        .method {
                            span {
                                &:first-child {
                                    font-size: 1.6rem;
                                    font-weight: 700;
                                }
                                &:nth-child(3) {
                                    font-size: 1.4rem;
                                }
                                &:last-child {
                                    font-size: 1.2rem;
                                    color: #a2a2a2;
                                }
                            }
                        }
                        .price_text {
                            font-weight: 500;
                            border-top: 0.1rem solid #ddd;
                        }
                        .price {
                            font-size: 1.6rem;
                            font-weight: 700;
                            border-top: 0.1rem solid #ddd;
                        }
                    }
                }
            `}</style>
        </>
    );
}
