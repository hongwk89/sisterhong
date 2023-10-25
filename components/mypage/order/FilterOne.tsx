import Calendar from './Calendar';

export default function FilterOne({ children, data, filter, setFilter, searchCalendar = null, type }) {
    const handleClick = (idx: number) => {
        setFilter((prev) => ({ ...prev, [type]: idx }));
    };

    return (
        <>
            {children}
            <ul>
                {data.map((val: string, idx: number) => (
                    <li key={idx}>
                        <button className={`${filter[type] === idx ? 'on' : ''}`} onClick={() => handleClick(idx)}>
                            {val}
                        </button>
                    </li>
                ))}
            </ul>
            {type === 'period' && filter.period === 4 && <Calendar searchCalendar={searchCalendar} />}
            <style jsx>{`
                ul {
                    display: flex;
                    gap: 0.7rem;
                    margin-top: 1.2rem;
                    li {
                        button {
                            font-size: 1.2rem;
                            padding: 0.7rem 1rem;
                            border: 1px solid #e8e8e8;
                            &.on {
                                color: var(--main-color);
                                border-color: var(--main-color);
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
