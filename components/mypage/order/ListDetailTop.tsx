import usePopToggle from '@hooks/usePopToggle';
import { useState } from 'react';
import CancelPop from './CancelPop';
import { deliveryStatus } from './ListTop';

const BUTTONSTATUS = ['결제완료', '입금대기', '취소완료', '취소요청'];

const buttonData = (name: string) => {
    const status = name === '취소요청' ? '취소요청중' : '취소완료';
    return { disabled: true, text: status };
};

export default function ListDetailTop({ data, setTracking, pacelPop }) {
    const { popOn, popOpen, popClose } = usePopToggle();

    const show_button = BUTTONSTATUS.includes(data.status);

    const [btn, setBtn] = useState(() => {
        if (data.status === '취소요청' || data.status === '취소완료') {
            return buttonData(data.status);
        }

        return { disabled: false, text: '취소요청' };
    });

    return (
        <>
            <div className="box">
                <h2>
                    주문상품
                    {deliveryStatus.includes(data.status) && (
                        <button type="button" className="commonButton typeWhite" onClick={() => pacelPop(data.order.order_id)}>
                            배송조회
                        </button>
                    )}
                    {show_button && (
                        <button type="button" className="cancelBtn" onClick={popOpen} disabled={btn.disabled}>
                            {btn.text}
                        </button>
                    )}
                </h2>
            </div>
            {show_button && <CancelPop data={data} setBtn={setBtn} setTracking={setTracking} popOn={popOn} popClose={popClose} buttonData={buttonData} />}
            <style jsx>{`
                .box {
                    button {
                        font-size: 1.2rem;
                        font-weight: 500;
                        width: 7rem;
                        height: 3rem;
                        &.typeWhite {
                            border-radius: 0;
                            padding: 0;
                        }
                        &.cancelBtn {
                            border: 0.1rem solid #aaa;
                            color: #a2a2a2;
                            border-radius: 0.5rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
