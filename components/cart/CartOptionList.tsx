import { ChangeEvent } from 'react';

interface data {
    option_idx: number;
    price: number;
    group: string;
    group_id: string;
    sold_out: string;
}

export default function CartOptionList({ type, lists, data, setData }) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        const selectedIndex = e.target.selectedIndex;
        const targetIdx = parseInt(e.target.options[selectedIndex].dataset.idx);

        if (name !== '') {
            e.target.options[0].selected = true;

            if (data[type].some((val) => val.option_idx === targetIdx)) {
                alert('이미 선택된 옵션입니다.');
                return;
            }

            setData((prev) => ({
                ...prev,
                [type]: [...prev[type].concat({ option_idx: targetIdx, group: name, amount: 1, sold_out: 'N' })]
            }));
        }
    };

    return (
        <>
            <select onChange={handleChange} defaultValue="" required>
                <option value="" hidden disabled>
                    상품추가선택
                </option>
                {lists.map((list: data, index: number) => (
                    <option key={index} data-idx={list.option_idx} disabled={list.sold_out !== 'N'}>
                        {list.group}
                    </option>
                ))}
            </select>
        </>
    );
}
