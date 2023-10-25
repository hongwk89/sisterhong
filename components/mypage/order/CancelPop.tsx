import CheckData from '@components/CheckData';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import onlyNumber from 'utils/onlyNumber';
import sendAxios from 'utils/sendAxios';

const COMPLETETEXTS = {
    bank_not_paid: '취소신청이 정상접수되었습니다. \n입금 전 취소로 확인 후 즉시 처리 예정입니다.',
    bank_paid: '취소신청이 정상접수되었습니다. \n기타사유로 신청이 거절될 수 있습니다. \n영업일 기준 1~2일 내 환불처리 예정입니다.',
    card_paid: '취소신청이 정상접수되었습니다. \n기타사유로 신청이 거절될 수 있습니다. \n결제승인 취소 후 \n영업일 기준 2~3일 내 \n환불됩니다. \n\n결제사 사정에 따라 승인취소 후 \n환불이 지연될 수 있습니다.'
};

interface cancelData {
    order_id: string;
    cancel_reason: string;
    cancel_memo: string;
    note: string;
    bank?: string;
    bank_name?: string;
    bank_number?: string;
}

export default function CancelPop({ data, setBtn, setTracking, popOn, popClose, buttonData }) {
    const [loading, setLoading] = useState(false);
    const [bankList, setBankList] = useState(null);
    const popup = useRef<HTMLDivElement>();
    const popup2 = useRef<HTMLDivElement>();
    const textareaRef = useRef<HTMLTextAreaElement>();
    const selectRef = useRef<HTMLSelectElement>();
    const bank = useRef<HTMLSelectElement>();
    const bank_name = useRef<HTMLInputElement>();
    const bank_number = useRef<HTMLInputElement>();
    const payment_method = data.order.payment_method;
    const pay_status = data.status;
    const bankPaid = data.status === '결제완료' && (data.order.payment_method === '무통장입금' || data.order.payment_method === '가상계좌');

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        const reason = selectRef.current.value;

        if (reason === '') {
            alert('사유선택은 필수입니다');
            selectRef.current.focus();
            setLoading(false);
        }

        let params: cancelData = {
            order_id: data.order.order_id,
            cancel_reason: selectRef.current.value,
            cancel_memo: textareaRef.current.value,
            note: selectRef.current.value + ' ' + textareaRef.current.value
        };

        if (bankPaid) {
            const bank_val = bank.current.value;
            const bank_name_val = bank_name.current.value;
            const bank_number_val = bank_number.current.value;

            if (bank_val === '') {
                alert('환불받으실 은행명을 입력해주세요');
                bank.current.focus();
                setLoading(false);
                return;
            }
            if (bank_name_val === '') {
                alert('환불받으실 계좌번호를 입력해주세요');
                bank_name.current.focus();
                setLoading(false);
                return;
            }
            if (bank_number_val === '') {
                alert('환불받으실 예금주를 입력해주세요');
                bank_number.current.focus();
                setLoading(false);
                return;
            }

            params.bank = bank.current.value;
            params.bank_name = bank_name.current.value;
            params.bank_number = bank_number.current.value;
        }

        const config = { method: 'post', url: `${process.env.API_HOST}/order/cancel`, data: params };
        const success = (res) => {
            popup.current.style.display = 'none';
            popup2.current.style.display = 'block';
            setBtn(() => buttonData(res.data.status));
            setTracking(data.status);
        };
        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        setLoading(false);
    };

    useEffect(() => {
        if (popup2.current) {
            const pop = popup2.current;

            const initPop = () => {
                if (popup2.current.style.display === 'block') {
                    popup.current.style.display = 'block';
                    popup2.current.style.display = 'none';
                }
            };

            pop.addEventListener('transitionend', initPop, false);

            return () => pop.removeEventListener('transitionend', initPop);
        }
    }, []);

    useEffect(() => {
        const getBankList = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/banks`
            };
            const result = await sendAxios({ config });

            setBankList(result);
        };
        getBankList();
    }, []);

    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className="content fade" ref={popup}>
                    <h2>
                        주문취소
                        <button className="close_btn" onClick={popClose}>
                            <span className="hidden">닫기버튼</span>
                        </button>
                    </h2>
                    <div className="inner">
                        <form onSubmit={handleSubmit}>
                            <h3>취소사유를 선택해주세요.</h3>
                            <div className="selectBox">
                                <select defaultValue="" required ref={selectRef}>
                                    <option value="" hidden disabled>
                                        사유선택(필수)
                                    </option>
                                    {data.reason.map((list: string, index: number) => (
                                        <option key={index}>{list}</option>
                                    ))}
                                </select>
                                <span className="arrow"></span>
                            </div>
                            <div>
                                <textarea placeholder="상세사유 입력" ref={textareaRef}></textarea>
                            </div>
                            <div className="notice">
                                <p>※ 출고가 완료된 이후 취소는 불가합니다.</p>
                                <p>
                                    ※ 추가 문의사항은 고객센터 혹은 1:1문의로 연락주시면
                                    <br />
                                    &emsp; 빠른 처리 도와드리겠습니다.
                                </p>
                            </div>
                            {bankPaid && (
                                <div className="bankPaid">
                                    <h3>환불받으실 계좌를 입력해주세요.</h3>
                                    <p>
                                        고객님 주문 건 무통장입금 결제완료되어
                                        <br />
                                        환불받으실 은행계좌정보를 입력해주세요.
                                    </p>
                                    <div className="grid">
                                        <div>
                                            <span>은행명</span>
                                        </div>
                                        <div>
                                            <div className="selectBox">
                                                <select defaultValue="" required ref={bank}>
                                                    <option value="" hidden disabled>
                                                        환불받으실 은행
                                                    </option>
                                                    {bankList && (
                                                        <CheckData data={bankList}>
                                                            {bankList.state === 'success' && (
                                                                <>
                                                                    {bankList.data.map((list, idx: number) => (
                                                                        <option key={idx}>{list.name}</option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </CheckData>
                                                    )}
                                                </select>
                                                <span className="arrow"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <span>계좌번호</span>
                                        </div>
                                        <div>
                                            <input type="number" placeholder="숫자만 입력" {...onlyNumber} ref={bank_number} />
                                        </div>
                                        <div>
                                            <span>예금주</span>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="환불계좌의 예금주명" ref={bank_name} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <button type="submit" className="commonButton typeRed" disabled={loading}>
                                    취소요청하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="completePop fade" ref={popup2}>
                    <h3>취소신청완료</h3>
                    <p>
                        {payment_method === '무통장입금' && pay_status === '입금대기' && COMPLETETEXTS.bank_not_paid}
                        {payment_method === '무통장입금' && pay_status === '결제완료' && COMPLETETEXTS.bank_paid}
                        {payment_method !== '무통장입금' && COMPLETETEXTS.card_paid}
                    </p>
                    <div>
                        <button type="button" className="commonButton" onClick={popClose}>
                            닫기
                        </button>
                        <Link href="/" className="commonButton typeBlack">
                            홈 화면으로
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .pop_bg {
                    .content {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-55%);
                        background: #fff;
                        width: 100%;
                        max-height: 70%;
                        overflow: auto;
                        h2 {
                            background: linear-gradient(to right, #f8f8fa, transparent);
                            .close_btn {
                                @include mixins.closeBtn(2.3rem, 0.2rem, #a2a2a2);
                            }
                        }
                        .inner {
                            padding: 2rem var(--side-padding-inner) 3rem;
                            h3 {
                                font-size: 1.8rem;
                                font-weight: 500;
                                text-align: center;
                                margin-bottom: 2rem;
                            }
                            .selectBox {
                                margin-bottom: 1rem;
                            }
                            textarea {
                                display: block;
                                width: 100%;
                                height: 15rem;
                                border: 0.1rem solid #a2a2a2;
                                padding: 0.7rem;
                                font-size: 1.4rem;
                                &::placeholder {
                                    color: #a2a2a2;
                                }
                            }
                            .bankPaid {
                                h3 {
                                    margin-bottom: 1rem;
                                }
                                p {
                                    font-size: 1.4rem;
                                    color: #767676;
                                    text-align: center;
                                    margin-bottom: 2rem;
                                }
                                .grid {
                                    display: grid;
                                    grid-template-columns: 9rem 1fr;
                                    margin-bottom: 1.5rem;
                                    border-bottom: 0.1rem solid #707070;
                                    > div {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-top: 0.1rem solid #707070;
                                        padding: 1rem 0.6rem;
                                        &:nth-child(2n-1) {
                                            background: #f8f8fa;
                                            font-size: 1.6rem;
                                            font-weight: 500;
                                        }
                                        .selectBox {
                                            width: 100%;
                                            height: 100%;
                                            margin-bottom: 0;
                                        }
                                        input {
                                            border-radius: 0;
                                            height: 3.5rem;
                                            font-size: 1.4rem;
                                            padding: 0 1.2rem;
                                        }
                                    }
                                }
                            }
                            .notice {
                                margin: 1rem 0 2rem;
                                padding: 0 1.5rem;
                                p {
                                    color: #a2a2a2;
                                }
                            }
                        }
                    }
                    .completePop {
                        display: none;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 95%;
                        padding: 4rem var(--side-padding);
                        background: #fff;
                        h3 {
                            font-size: 1.8rem;
                            font-weight: 700;
                            text-align: center;
                        }
                        p {
                            text-align: center;
                            font-size: 1.4rem;
                            color: #707070;
                            margin: 3rem 0;
                            white-space: pre-wrap;
                        }
                        div {
                            display: flex;
                            gap: 1rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
