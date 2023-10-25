import { create } from 'zustand';

const useMenuToggle = create(() => ({
    menuToggle: false,
    searchToggle: false
}));

export default useMenuToggle;
