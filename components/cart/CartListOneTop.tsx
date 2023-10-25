import Brands from '@components/Brands';
import { useState } from 'react';
import cartAmountAxios from 'utils/cartAmountAxios';
import sendAxios from 'utils/sendAxios';

export default function CartListOneTop({ data, setCartList, handleCheck, setPopIdx, popOpen }) {
    const [loading, setLoading] = useState(false);
    const idx = data.idx;

    const changeOpt = () => {
        setPopIdx(idx);
        popOpen();
    };

    const deleteCart = async () => {
        setLoading(true);
        const config = { method: 'delete', url: `${process.env.API_HOST}/shopping-carts/${idx}` };

        await sendAxios({ config, resFunc: (res) => setCartList(res.products), errFunc: (err) => alert(err.message) });
        await cartAmountAxios();
    };

    return (
        <>
            <div className="brand_area">
                <Brands data={data.brand} />
            </div>
            <div className="checkWrap">
                <input type="checkbox" name={`agree${idx}`} id={`agree${idx}`} onChange={handleCheck} data-idx={data.idx} defaultChecked />
                <label className="title" htmlFor={`agree${idx}`}>
                    {data.product_name}
                </label>
                {data.event_product || (
                    <div className="optionBtn">
                        <button type="button" onClick={changeOpt} disabled={loading}>
                            옵션변경
                        </button>
                        <button type="button" onClick={deleteCart} disabled={loading}>
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <style jsx>{`
                .brand_area {
                    margin-left: 2.6rem;
                }
                .checkWrap {
                    justify-content: space-between;
                    .title {
                        display: inline-block;
                        font-size: 1.8rem;
                        font-weight: 500;
                        width: 21rem;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        &:before {
                            display: inline-block;
                            vertical-align: -0.3rem;
                        }
                    }
                    .optionBtn {
                        button {
                            padding: 0.5rem 1rem;
                            background: #f8f8fa;
                            font-size: 1.2rem;
                            margin-left: 0.7rem;
                            &:first-child {
                                font-weight: 700;
                            }
                            &:last-child {
                                color: #707070;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
