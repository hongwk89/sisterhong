interface filter {
    [key: string]: string;
}

export default function Filter({ FILTERLIST, filter, setFilter }) {
    return (
        <>
            <ul className="filter">
                {FILTERLIST.map((list: filter, idx: number) => (
                    <li key={idx} className={`${filter === list.val ? 'active' : ''}`} onClick={() => setFilter(list.val)}>
                        {list.name}
                    </li>
                ))}
            </ul>
            <style jsx>{`
                .filter {
                    display: flex;
                    justify-content: space-around;
                    border-top: 1px solid #a2a2a2;
                    border-bottom: 1px solid #a2a2a2;
                    li {
                        font-size: 1.4rem;
                        font-weight: 500;
                        color: #707070;
                        padding: 1rem;
                        cursor: pointer;
                        &.active {
                            font-weight: 700;
                            color: #ce2223;
                        }
                    }
                }
            `}</style>
        </>
    );
}
