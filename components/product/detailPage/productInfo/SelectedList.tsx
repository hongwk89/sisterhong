import convertPrice from 'utils/convertPrice';
import SelectedChange from './SelectedChange';

export default function SelectedList({ list, updateSelectedList }) {
    const idx = list.idx;

    const deleteBtn = () => {
        const params = {
            price: list.price,
            amount: 0
        };
        updateSelectedList(idx, params, 'del');
    };

    const updateOption = (amount: number) => {
        const params = {
            amount: amount
        };
        updateSelectedList(idx, params, 'update');
    };

    return (
        <>
            <div className="selectedList">
                <div>
                    <p>{list.title}</p>
                    <span className="close" onClick={deleteBtn}>
                        <span className="hidden">삭제</span>
                    </span>
                </div>
                <span className={`price ${list.promo !== 0 ? 'promo' : ''}`}>{convertPrice(list.price)}원</span>
                <SelectedChange initAmount={list.amount} updateOption={updateOption} limit={list.inventory} eventLimit={list.limitation} />
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .selectedList {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    row-gap: 0.5rem;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 1.5rem;
                    div {
                        height: 4rem;
                        column-gap: 1rem;
                        grid-column: auto / span 2;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                            font-size: 1.8rem;
                            font-weight: 500;
                            color: #707070;
                        }
                        .close {
                            display: block;
                            @include mixins.closeBtn(1.5rem, 0.2rem, #a2a2a2);
                        }
                    }
                    .price {
                        font-size: 2.2rem;
                        font-weight: 700;
                    }
                    .promo {
                        color: var(--main-color);
                    }
                }
            `}</style>
        </>
    );
}
