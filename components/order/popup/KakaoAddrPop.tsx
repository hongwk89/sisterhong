import useBotNavHeight from '@hooks/store/useBotNavHeight';
import { useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';

interface postData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
}

export default function KakaoAddrPop({ popOn, popClose, setAddress, setResetPost }) {
    const wrap = useRef();
    const { botNavHeight } = useBotNavHeight();

    const handleComplete = (data: postData) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setAddress({ zonecode: data.zonecode, addr: fullAddress, detailAddr: '' });
        setResetPost((prev) => prev + 1);
    };

    return (
        <>
            <div id="wrap" className={popOn} ref={wrap}>
                <button type="button" className="closeBtn" onClick={popClose}>
                    닫기
                </button>
                <DaumPostcode onComplete={handleComplete} style={{ width: '100%', height: `calc(100% - ${botNavHeight}px)`, paddingTop: '4rem', boxSizing: 'border-box' }} />
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                #wrap {
                    display: none;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    height: 100%;
                    position: fixed;
                    top: 0;
                    z-index: 50;
                    background: #fff;
                    &.on {
                        display: block;
                    }
                    .closeBtn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        width: 100%;
                        height: 4rem;
                        font-size: 1.6rem;
                        font-weight: 500;
                        top: 0;
                        right: 0;
                        background: #ccc;
                    }
                }
            `}</style>
        </>
    );
}
