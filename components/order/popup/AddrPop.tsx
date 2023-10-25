import { useEffect } from 'react';
import sendAxios from 'utils/sendAxios';
import toPhoneForm from 'utils/toPhoneForm';
import { shipInfo } from '../DestinationInfo';
import AddrBtns from './AddrBtns';
import ModifyPop from './ModifyPop';

export default function AddrPop({ lists, setLists, selectedNum, setSelectedNum, popOn2, setPopOn2, type = null }) {
    const handleAddr = async (shipping: number, setLists) => {
        const config = { method: 'post', url: `${process.env.API_HOST}/auth/user-address/process`, data: { shipping } };
        const success = () => {
            setLists((prev) =>
                prev.map((val) => {
                    if (val.shipping === shipping) {
                        val.default_address = 'Y';
                    } else {
                        val.default_address = 'N';
                    }

                    return val;
                })
            );
            return true;
        };
        const fail = (err) => {
            alert(err.message);
            return false;
        };
        const result = await sendAxios({ config, resFunc: success, errFunc: fail });

        return result;
    };

    return (
        <>
            <ul className="destination lists">
                {lists.map((list: shipInfo, idx: number) => (
                    <li key={idx}>
                        <label className={type !== 'mypage' ? 'radioCheckLabel' : ''}>
                            {type !== 'mypage' && <input type="radio" name="destination" onChange={() => setSelectedNum((prev) => ({ prev: prev.current, current: list.shipping }))} checked={list.shipping === selectedNum.current} />}
                            <div>
                                <p>
                                    {list.user_name} {list.default_address === 'Y' && <span>기본배송지</span>}
                                </p>
                                <p>{toPhoneForm(list.phone)}</p>
                                <p>
                                    {list.address} {list.detailed_address}
                                </p>
                            </div>
                        </label>
                        <AddrBtns list={list} handleAddr={handleAddr} setPopOn2={setPopOn2} selectedNum={selectedNum} setSelectedNum={setSelectedNum} setLists={setLists} />
                    </li>
                ))}
            </ul>
            <ModifyPop key={popOn2.data.shipping} popOn={popOn2} setPopOn={setPopOn2} setLists={setLists} handleAddr={handleAddr} setSelectedNum={setSelectedNum} length={lists.length} />

            <style jsx>{`
                .destination {
                    label {
                        align-items: normal;
                        input {
                            margin-top: 0.1rem;
                        }
                        div {
                            p {
                                &:first-child {
                                    span {
                                        font-size: 1rem;
                                        color: var(--main-color);
                                        margin-left: 0.5rem;
                                    }
                                }
                                &:nth-child(2) {
                                    font-size: 1.4rem;
                                    margin: 0.7rem 0;
                                }
                                &:nth-child(3) {
                                    font-size: 1.4rem;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
