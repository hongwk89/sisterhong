export default function PagerOne({ pages, page, getData }) {
    const maxPage = pages[pages.length - 1];
    const showNum = 5;
    const halfShowNum = Math.floor(showNum / 2);
    const showPager = [];

    if (page - halfShowNum <= 0) {
        for (let i = 1; i <= showNum && i <= maxPage; i++) {
            showPager.push(i);
        }
    } else if (page > maxPage - halfShowNum) {
        for (let i = maxPage; i > maxPage - showNum && i > 0; i--) {
            showPager.push(i);
        }
        showPager.sort((a, b) => a - b);
    } else {
        for (let i = page - halfShowNum; i <= page + halfShowNum; i++) {
            showPager.push(i);
        }
    }

    return (
        <>
            {showPager.map((num: number, idx: number) => {
                return (
                    <button key={idx} type="button" className={`${page === num ? 'on' : ''}`} onClick={() => getData(num)}>
                        {num}
                    </button>
                );
            })}
            <style jsx>{`
                button {
                    display: block;
                    font-size: 1.8rem;
                    font-weight: 500;
                    &.on {
                        color: var(--main-color);
                    }
                }
            `}</style>
        </>
    );
}
