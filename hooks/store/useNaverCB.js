import { create } from 'zustand';

const useNaverCB = create(() => ({
    _nasa: {},
    check: false
}));

export default useNaverCB;
