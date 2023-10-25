import { useState } from 'react';
import scrollLock from 'utils/scrollLock';

export default function usePopToggle() {
    const [popOn, setPopOn] = useState('');

    const popOpen = () => {
        setPopOn('on');
        scrollLock(true);
    };

    const popClose = () => {
        setPopOn('');
        scrollLock(false);
    };

    return { popOn, popOpen, popClose };
}
