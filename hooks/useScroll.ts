import { useState, useEffect } from 'react';

export function useScroll() {
    const [scrollY, setScrollY] = useState(0);

    const listener = () => {
        setScrollY(Math.abs(document.body.getBoundingClientRect().top));
    };

    useEffect(() => {
        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);

    return scrollY;
}
