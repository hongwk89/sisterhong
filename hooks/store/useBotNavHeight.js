import { create } from 'zustand';

// NavFloatingBar.js에서 높이값 설정
const useBotNavHeight = create(() => ({
    botNavHeight: 0
}));

export default useBotNavHeight;
