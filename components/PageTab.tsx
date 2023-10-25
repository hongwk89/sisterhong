import { useScroll } from '@hooks/useScroll';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PageTab({ texts, opt = null, tab, setTab, tabRef, rvNum = null }) {
    const scroll = useScroll();
    const router = useRouter();

    const clickTab = (idx: number) => {
        setTab(idx);

        router.push(
            {
                pathname: router.asPath.replace(/\?.*/, ''),
                query: { tabNum: idx }
            },
            undefined,
            { shallow: true }
        );

        if (tabRef.current.firstChild.classList.value.includes('sticky')) {
            window.scrollTo(0, tabRef.current.offsetTop);
        }
    };

    useEffect(() => {
        if (tabRef) {
            const tabTop = tabRef.current.getBoundingClientRect().top;

            if (tabTop <= 0) {
                tabRef.current.firstChild.classList.add('sticky');
            } else {
                tabRef.current.firstChild.classList.remove('sticky');
            }
        }
    }, [scroll]);

    return (
        <>
            <ul>
                {texts.map((list: string[], idx: number) => (
                    <li key={idx} className={`${tab === idx ? 'active' : ''}`} onClick={() => clickTab(idx)}>
                        {list} {idx === 1 && rvNum}
                        {opt && <span>{opt[idx]}</span>}
                    </li>
                ))}
            </ul>
            <style jsx>{`
                ul {
                    display: flex;
                    position: absolute;
                    top: 0;
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    z-index: 5;
                    background: #fff;
                    &.sticky {
                        position: fixed;
                    }
                    li {
                        display: block;
                        width: 100%;
                        cursor: pointer;
                        padding: 1rem 0;
                        text-align: center;
                        font-size: 1.4rem;
                        color: #767676;
                        border: 1px solid #e8e8e8;
                        border-left: 0;
                        cursor: pointer;
                        &:last-child {
                            border-right: 0;
                        }
                        &.active {
                            font-weight: 500;
                            background: #f8f8fa;
                            color: #191919;
                        }
                    }
                }
            `}</style>
        </>
    );
}
