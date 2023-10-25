const STARS = [1, 2, 3, 4, 5];

export default function Rating({ score, setScore }) {
    const handleClick = (num) => {
        setScore(num);
    };

    return (
        <>
            <ul>
                {STARS.map((star, idx) => (
                    <li key={idx} className={`${score >= idx + 1 ? 'on' : ''}`} onClick={() => handleClick(idx + 1)}>
                        <svg width="3rem" height="3rem" viewBox="0 0 60 60" preserveAspectRatio="none">
                            <path className="star" d="M30,0l9,20.142,21,2.776L44.562,38.142,48.541,60,30,49.267,11.459,60l3.979-21.858L0,22.918l21-2.776Z" />
                        </svg>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                ul {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1.2rem;
                    li {
                        cursor: pointer;
                        .star {
                            fill: #e8e8e8;
                        }
                        &.on {
                            .star {
                                fill: var(--main-color);
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
