import { create } from 'zustand';

const useCartAmount = create(() => ({
    amount: 0
}));

export default useCartAmount;
