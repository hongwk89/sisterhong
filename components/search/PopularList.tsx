import { useRef } from 'react';

interface popular {
    keyword: string;
    sort: number;
}

export function PopularButton({ list, idx, getResult, setValue }) {
    const text = useRef<HTMLSpanElement>();
    const handleClick = () => {
        const val = text.current.innerHTML;

        setValue(val);
        getResult(val);
    };

    return (
        <>
            <li>
                <button type="button" onClick={handleClick}>
                    <span>{idx + 1}. </span>
                    <span ref={text}>{list.keyword}</span>
                </button>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    align-items: center;
                    button {
                        font-size: 1.5rem;
                    }
                    span:first-child {
                        margin-right: 0.5rem;
                    }
                }
            `}</style>
        </>
    );
}

export default function PopularList({ data, getResult, setValue }) {
    return (
        <>
            <h3>인기검색어</h3>
            <ul>
                {data.map((list: popular, idx: number) => (
                    <PopularButton key={idx} list={list} idx={idx} getResult={getResult} setValue={setValue} />
                ))}
            </ul>
            <style jsx>{`
                h3 {
                    text-align: center;
                    font-size: 1.8rem;
                    padding-bottom: 0.8rem;
                    color: var(--main-color);
                    font-weight: 500;
                    border-bottom: 0.2rem solid var(--main-color);
                }
                ul {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem 2rem;
                    padding: 1.5rem;
                }
            `}</style>
        </>
    );
}
