import { useState } from 'react';
import sendAxios from 'utils/sendAxios';
import { shipInfo } from '../DestinationInfo';

export default function AddrBtns({ list, handleAddr, selectedNum, setSelectedNum, setPopOn2, setLists }) {
    const [loading, setLoading] = useState(false);
    const handleModify = (list: shipInfo) => {
        setPopOn2({ on: 'on', data: list });
    };

    const setDefault = async (shipping: number = list.shipping) => {
        setLoading(true);
        await handleAddr(shipping, setLists);
        setLoading(false);
    };
    const handleDelete = async (shipping: number, default_address: string) => {
        if (default_address === 'Y') {
            alert('기본배송지 변경 후 삭제가능합니다.');

            return;
        }

        setLoading(true);

        const config = { method: 'post', url: `${process.env.API_HOST}/auth/user-address/process`, data: { shipping, process: 'delete' } };
        const success = () => {
            setLists((prev) => {
                const newList = prev.filter((data: shipInfo) => data.shipping !== shipping);

                if (selectedNum.current === shipping) {
                    setSelectedNum((prev) => ({ ...prev, current: newList[0].shipping }));
                }

                return newList;
            });
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        setLoading(false);
    };

    return (
        <>
            <div className="btns">
                {list.default_address !== 'Y' && (
                    <button type="button" className="addr" onClick={() => setDefault()} disabled={loading}>
                        기본배송지 설정
                    </button>
                )}
                <button type="button" onClick={() => handleModify(list)} disabled={loading}>
                    수정
                </button>
                <button type="button" onClick={() => handleDelete(list.shipping, list.default_address)} disabled={loading}>
                    삭제
                </button>
            </div>
            <style jsx>{`
                .btns {
                    display: flex;
                    justify-content: right;
                    padding-bottom: 0;
                    gap: 1rem;
                    margin-top: 1.2rem;
                    button {
                        color: #707070;
                        padding: 0.5rem 1rem;
                        background: #f8f8fa;
                        border-radius: 0.5rem;
                        &.addr {
                            color: #000;
                        }
                    }
                }
            `}</style>
        </>
    );
}
