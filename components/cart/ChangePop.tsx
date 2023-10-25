import { useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import CartOption from './CartOption';

export default function ChangePop({ popIdx, popClose, cartData, setCartList, setPopIdx }) {
    const [data, setData] = useState({ option: null, sauce: null });
    const [state, setState] = useState({ error: null, defaultData: null });
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const popSet = async () => {
        setLoading(true);

        const newArr = Object.keys(data).map((key) => {
            const result = data[key].map((val) => {
                const keys = Object.keys(val).filter((key2) => {
                    if (key2 === 'option_idx' || key2 === 'amount') {
                        return true;
                    } else {
                        return false;
                    }
                });

                let newObj = {};
                keys.map((el) => {
                    Object.assign(newObj, { [el]: val[el] });
                });

                return newObj;
            });

            return { [key]: result };
        });

        const newData = Object.assign({}, newArr[0], newArr[1]);
        const JsonData = JSON.stringify(newData);
        const config = { method: 'put', url: `${process.env.API_HOST}/shopping-carts/${cartData.idx}`, data: { data: JsonData } };
        const success = (res) => {
            setCartList(res.products);
            setPopIdx(null);
            popClose();
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        setLoading(false);
    };

    const handleClose = () => {
        setPopIdx(null);
        popClose();
        setReset((prev) => !prev);
    };

    useEffect(() => {
        if (popIdx === cartData?.idx) {
            const getProductOption = async () => {
                const config = { method: 'get', url: `${process.env.API_HOST}/shopping-carts/${cartData.idx}` };
                const success = (res) => {
                    setState({ ...state, defaultData: res.product_options });
                    setData({ option: res.cart_options.options, sauce: res.cart_options.sauces });
                };
                const fail = (err) => {
                    setState({ ...state, error: err.message });
                };

                await sendAxios({ config, resFunc: success, errFunc: fail });
            };
            getProductOption();
        }
    }, [popIdx]);

    return (
        <>
            <div className={`pop_bg ${popIdx === cartData?.idx ? 'on' : ''}`}>
                <div className="content fade">
                    <h3>옵션변경</h3>
                    <div className="option">
                        <h5>1. 상품옵션</h5>
                        {Object.keys(data).map((key, idx) => (
                            <div key={idx} className={`${key}_inner`}>
                                <CartOption type={key} data={data} setData={setData} state={state} reset={reset} />
                            </div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button type="button" disabled={loading} onClick={popSet}>
                            적용
                        </button>
                        <button type="button" disabled={loading} onClick={handleClose}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .pop_bg {
                    .content {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        transform: translateY(-55%);
                        background: #fff;
                        h3,
                        button {
                            color: #000000;
                            font-size: 1.8rem;
                            font-weight: 700;
                            text-align: center;
                            padding: 0.8rem 0;
                            background: #f8f8fa;
                        }
                        .option {
                            padding: 3rem;
                            max-height: 40rem;
                            overflow: auto;
                            .option_inner {
                                margin-bottom: 3rem;
                            }
                            h5 {
                                font-size: 1.6rem;
                                font-weight: 500;
                                margin-bottom: 1.2rem;
                            }
                            select {
                                width: 100%;
                                padding: 0.7rem;
                            }
                        }
                        .buttons {
                            display: flex;
                            button {
                                display: block;
                                width: 50%;
                                &:first-child {
                                    background: #e8e8e8;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
