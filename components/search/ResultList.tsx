import ProductList from '@components/product/ProductList';
import useBotNavHeight from '@hooks/store/useBotNavHeight';
import { useEffect, useRef, useState } from 'react';
import scrollCheck from 'utils/scrollCheck';

export default function ResultList({ resultList, setPageNum, pageNum }) {
    const [top, setTop] = useState(0);
    const { botNavHeight } = useBotNavHeight();
    const scrollArea = useRef<HTMLUListElement>();

    const updatePage = () => {
        if (pageNum < resultList.pagination.endPage) {
            setPageNum((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setTop(scrollArea.current.getBoundingClientRect().top);
    }, []);

    useEffect(() => {
        if (scrollArea.current.lastChild) {
            const intersectionObserver = scrollCheck(scrollArea.current.lastChild as HTMLLIElement, updatePage);

            return () => intersectionObserver.disconnect();
        }
    }, [resultList]);

    return (
        <>
            <p>총 {resultList.pagination.total}개</p>
            <div>
                <ul ref={scrollArea} className={resultList.pagination.total === 0 && 'no-result'}>
                    {resultList.list.map((list, idx) => (
                        <ProductList key={idx} list={list} idx={idx} />
                    ))}
                    {resultList.pagination.total === 0 && <li>검색결과가 없습니다.</li>}
                </ul>
            </div>
            <style jsx>{`
                $top: ${top}px;
                $botNavHeight: ${botNavHeight}px;
                h2 {
                    margin-top: 7.5rem;
                    color: #a2a2a2;
                    font-size: 1.8rem;
                    text-align: center;
                }
                p {
                    margin-bottom: 0.5rem;
                    font-size: 1.4rem;
                    color: #707070;
                }
                div {
                    height: calc(100vh - $top - $botNavHeight - 3rem);
                    overflow-y: auto;
                    ul {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        column-gap: 1.6rem;
                        row-gap: 2rem;

                        &.no-result {
                            grid-template-columns: 1fr;
                            li {
                                text-align: center;
                                margin-bottom: 0.5rem;
                                font-size: 1.4rem;
                                color: #707070;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
