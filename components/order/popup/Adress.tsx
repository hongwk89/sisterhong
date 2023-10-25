import { useInputVal } from '@hooks/useInput';
import usePopToggle from '@hooks/usePopToggle';
import KakaoAddrPop from './KakaoAddrPop';

export default function Address({ address, setAddress, setResetPost }) {
    const { popOn, popOpen, popClose } = usePopToggle();

    return (
        <>
            <div>
                <input type="text" readOnly placeholder="우편번호" data-type="zipcode" {...useInputVal(address.zonecode)} />
                <button type="button" onClick={popOpen}>
                    주소검색
                </button>
                <input className="full" type="text" readOnly placeholder="기본주소" data-type="address" {...useInputVal(address.addr)} />
                <input className="full" type="text" placeholder="상세주소" data-type="detailed_address" {...useInputVal(address.detailAddr)}></input>
            </div>
            <KakaoAddrPop popOn={popOn} popClose={popClose} setAddress={setAddress} setResetPost={setResetPost} />
            <style jsx>{`
                div {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-template-rows: repeat(3, 1fr);
                    gap: 1rem;
                    padding: 0 var(--side-padding-inner);
                    button {
                        width: 9rem;
                        height: 4rem;
                        background: #a2a2a2;
                        color: #fff;
                        font-weight: 500;
                        font-size: 1.6rem;
                    }
                    .full {
                        grid-column: 1 / 3;
                    }
                }
            `}</style>
        </>
    );
}
