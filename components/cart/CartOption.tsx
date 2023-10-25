import CartOptionList from './CartOptionList';
import CartOptionSelected from './CartOptionSelected';

interface cartDefaultOption {
    option_idx: number;
    price?: number;
    group: string;
    group_id?: string;
    sold_out: string;
    amount: number;
}

export default function CartOption({ type, data, setData, state, reset }) {
    return (
        <>
            {state.error ? (
                <p>{state.error}</p>
            ) : (
                <>
                    {state.defaultData && data[type] && (
                        <>
                            <div className="selectBox">
                                <CartOptionList type={type} lists={state.defaultData[type]} data={data} setData={setData} />
                                <span className="arrow"></span>
                            </div>
                            {data[type].length > 0 && (
                                <ul>
                                    {data[type].map((list: cartDefaultOption, index: number, array: []) => (
                                        <CartOptionSelected key={index} type={type} list={list} data={data} setData={setData} reset={reset} length={array.length} />
                                    ))}
                                </ul>
                            )}

                            {type === 'option' && data.option[0].limitation !== 100000 && <p>해당 상품은 최대 {data.option[0].limitation}개까지 구매가능합니다</p>}
                        </>
                    )}
                    <style jsx>{`
                        ul {
                            padding: 2rem 0 0 1rem;
                        }
                        p {
                            color: var(--main-color);
                            text-align: center;
                            margin-top: 1rem;
                            font-size: 1.2rem;
                        }
                    `}</style>
                </>
            )}
        </>
    );
}
