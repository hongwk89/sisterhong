import { useEffect, useState } from 'react';
import focusToLast from 'utils/focusToLast';

export default function usePwToggle() {
    const [type, setType] = useState('password');

    const toggleType = (eye: HTMLElement) => {
        eye.addEventListener('click', function () {
            const pw = document.querySelector('#pw') as HTMLInputElement;

            if (type === 'password') {
                setType('text');
            } else {
                setType('password');
            }

            focusToLast(pw);
        });
    };

    useEffect(() => {
        const eye = document.querySelector('.eye') as HTMLElement;

        if (eye) {
            toggleType(eye);

            return () => eye.removeEventListener('click', () => toggleType(eye));
        }
    }, [type]);

    return type;
}
