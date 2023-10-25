import { useEffect, useState } from 'react';

interface promo {
    discount_ratio: number;
    discount_type: number;
    percent: number;
    price: number;
    promotion_end_date: string;
    promotion_start_date: string;
    promotion_state: number;
}

interface option {
    amount: number;
    group: string;
    idx: number;
    option_detail: [];
    price: number;
    inventory: number;
    promotion: promo[];
    limitation: number;
}

type opt = 'add' | 'del' | 'update';

export default function useCalcList() {
    const [selectedList, setSelectedList] = useState([]);
    const [total, setTotal] = useState(0);

    const updateSelectedList = (idx: number, params: option, option: opt = 'add') => {
        if (option === 'add') {
            const promo = params.promotion.length;
            const price = promo !== 0 ? params.promotion[0].price : params.price;

            setSelectedList((prev) => [...prev, { idx, price, amount: params.amount, title: params.group, promo, inventory: params.inventory, limitation: params.limitation }]);
        } else if (option === 'update') {
            setSelectedList((prev) =>
                prev.map((item) => {
                    if (item.idx === idx) {
                        return { ...item, amount: params.amount };
                    }
                    return item;
                })
            );
        } else if (option === 'del') {
            setSelectedList((prev) => prev.filter((item) => item.idx !== idx));
        }
    };

    useEffect(() => {
        let sum = 0;

        selectedList.map((list) => (sum += list.price * list.amount));
        setTotal(sum);
    }, [selectedList]);

    return { selectedList, updateSelectedList, total };
}
