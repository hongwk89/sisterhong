import sendAxios from 'utils/sendAxios';
import PagerOne from './PagerOne';

export default function Pager({ product_id = null, datas, setDatas, type }) {
    let pages = [];

    for (let i = 1; i <= datas.pagination.totalPages; i++) {
        pages.push(i);
    }

    const getData = async (num: number) => {
        if (datas.loadedPages.includes(num)) {
            setDatas((prev) => ({ ...prev, curPage: num }));
        } else {
            let config;

            if (type === 'contact') {
                config = { method: 'get', url: `${process.env.API_HOST}/articles/ask`, params: { page: num } };
            }
            if (type === 'review') {
                config = { method: 'get', url: `${process.env.API_HOST}/product/reviews`, params: { product_id, page: num } };
            }

            const success = (res) => {
                const pagesArr = [...datas.loadedPages, num].sort();
                let dataArr = datas.data;
                const addData = type === 'contact' ? res.list.ask : res.list;

                pages.map((page: number, idx: number) => {
                    if (page === num) {
                        dataArr = [...dataArr.slice(0, idx), addData, ...dataArr.slice(idx + 1)];
                    } else if (!pagesArr.includes(idx + 1) && dataArr[idx] === undefined) {
                        dataArr.push([]);
                    }
                });

                setDatas((prev) => ({ ...prev, data: dataArr, curPage: num, loadedPages: pagesArr }));
            };
            await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
        }

        if (type === 'contact') {
            window.scrollTo(0, 0);
        }
        if (type === 'review') {
            const tabTop = (document.querySelector('#detailPageTab') as HTMLDivElement).offsetTop;

            window.scrollTo(0, tabTop);
        }
    };

    return (
        <>
            <div className="pager">
                <button type="button" onClick={() => getData(datas.curPage - 1)} disabled={datas.curPage === pages[0]}>
                    <span className="arrow left"></span>
                </button>
                <PagerOne pages={pages} page={datas.curPage} getData={getData} />
                <button type="button" onClick={() => getData(datas.curPage + 1)} disabled={datas.curPage === pages[pages.length - 1]}>
                    <span className="arrow right"></span>
                </button>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .pager {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    align-items: center;
                    padding-bottom: 3rem;
                    margin-top: 2.5rem;
                    button {
                        display: block;
                        .arrow {
                            position: relative;
                            display: block;
                            width: 3rem;
                            height: 3rem;
                            &.left {
                                @include mixins.arrow(1rem, 0.2rem, 45deg, left);
                            }
                            &.right {
                                @include mixins.arrow(1rem, 0.2rem, 45deg, right);
                            }
                        }
                        &:disabled {
                            .arrow {
                                &.left {
                                    @include mixins.arrow(1rem, 0.2rem, 45deg, left, #e8e8e8);
                                }
                                &.right {
                                    @include mixins.arrow(1rem, 0.2rem, 45deg, right, #e8e8e8);
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
