import { useEffect, useState } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0, over: false });

    useEffect(() => {
        const handleResize = () => {
            const max_width = document.querySelector('#main_content').clientWidth;

            setWindowSize({
                width: window.innerWidth > max_width ? max_width : window.innerWidth,
                height: window.innerHeight,
                over: window.innerWidth > parseInt(process.env.MAX_WIDTH) ? true : false
            });
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
