import SelectedChange from '@components/product/detailPage/productInfo/SelectedChange';

export default function CartOptionSelected({ list, type, data, setData, reset, length }) {
    const soldOut = list.sold_out === 'Y';
    const disabled = list.disabled;

    const updateOption = (amount: number) => {
        let copyData = { ...data };
        const index = copyData[type].findIndex((el) => el.option_idx === list.option_idx);

        copyData[type][index].amount = amount;

        setData(copyData);
    };

    const deleteCart = () => {
        if (length <= 1 && type === 'option') {
            alert('최소한 1개 이상의 상품이 필요합니다.');
        } else {
            setData((prev) => ({
                ...prev,
                [type]: [...prev[type].filter((val) => val.option_idx !== list.option_idx)]
            }));
        }
    };

    return (
        <>
            <li>
                <div className="left">
                    {soldOut && <span className="sold_out">품절</span>}
                    {disabled && <span className="sold_out">구매불가</span>}
                    <span className={`name ${soldOut || disabled ? 'soldOut' : ''}`}>{list.group}</span>
                    <span className="delete" onClick={deleteCart}></span>
                </div>
                <SelectedChange initAmount={list.amount} type={'cart'} updateOption={updateOption} soldOut={soldOut} reset={reset} limit={list.inventory} eventLimit={list.limitation} />
            </li>
            <style jsx>{`
                @use 'styles/mixins';
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    gap: 1rem;
                    .left {
                        .sold_out {
                            display: block;
                            color: #e01922;
                        }
                        .name {
                            font-size: 1.6rem;
                            &.soldOut {
                                color: #a2a2a2;
                            }
                        }
                        .delete {
                            display: inline-block;
                            margin-left: 0.5rem;
                            @include mixins.closeBtn(1.5rem, 0.1rem);
                        }
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            `}</style>
        </>
    );
}
