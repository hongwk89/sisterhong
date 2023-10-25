import { create } from 'zustand';

const useTokenStore = create(() => ({
    token: false
}));

export default useTokenStore;
