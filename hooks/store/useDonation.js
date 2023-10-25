import { create } from 'zustand';

const useDonation = create(() => ({
    donation: 'F',
    changed_point: 0,
    donation_price: 500
}));

export default useDonation;
