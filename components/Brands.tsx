import { Fragment } from 'react';

export default function Brands({ data }) {
    return (
        <div className="brands">
            {data.map((list: string, idx: number, arr: []) => (
                <Fragment key={idx}>
                    <span className={`brand ${list}`}>{list.toUpperCase()}</span>
                    {idx !== arr.length - 1 && <span className="and">&</span>}
                </Fragment>
            ))}
        </div>
    );
}
