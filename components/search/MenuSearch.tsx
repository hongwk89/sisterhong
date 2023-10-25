import CheckData from '@components/CheckData';
import { useCallback, useRef, useEffect, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import PopularList from './PopularList';
import ResultList from './ResultList';

export default function MenuSearch() {
    const [isLoading, setIsLoading] = useState(false);
    const [resultList, setResultList] = useState(null);
    const [value, setValue] = useState('');
    const [inputActive, setInputActive] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const popular = useRef(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = e;

        setValue(value);
        if (value === '') setResultList(null);
    };

    const getSearchResult = async (num: number, val: string) => {
        const config = { method: 'get', url: `${process.env.API_HOST}/product/list`, params: { search: val, limit: 10, page: num } };

        return await sendAxios({ config });
    };

    const inputSearch = useCallback(() => {
        (document.activeElement as HTMLInputElement).blur();
        setInputActive('active');
    }, []);

    const inputDefault = () => {
        setInputActive('');
    };

    const getResult = async (val: string) => {
        setIsLoading(true);
        setPageNum(1);

        const search_reasult = await getSearchResult(1, val);

        if (search_reasult.state === 'fail') {
            alert(search_reasult.data.message);
        }

        setResultList(search_reasult);

        inputSearch();

        setIsLoading(false);

        kakaoPixel(process.env.KAKAO_PIXEL).search({
            keyword: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        getResult(value);
    };

    useEffect(() => {
        const addData = async () => {
            const result = await getSearchResult(pageNum, value);

            if (result.state === 'success') {
                const {
                    data: { list }
                } = result;

                setResultList((prev) => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        list: [...prev.data.list.concat(list)]
                    }
                }));
            } else {
                alert(result.data.message);
            }
        };

        if (pageNum !== 1) {
            addData();
        }
        //
    }, [pageNum]);

    useEffect(() => {
        const getPopular = async () => {
            const config = {
                method: 'get',
                url: `${process.env.API_HOST}/top_searches`
            };
            popular.current = await sendAxios({ config });
        };
        getPopular();
    }, []);

    return (
        <>
            <div className={`search_area ${inputActive}`}>
                <form onSubmit={handleSubmit}>
                    <input name="search" type="text" placeholder="검색어를 입력해주세요." onChange={handleChange} onFocus={inputDefault} value={value} />
                    <button type="submit" className="search_btn" disabled={isLoading}>
                        <span className="hidden">검색</span>
                    </button>
                </form>
            </div>
            {resultList ? (
                <CheckData data={resultList}>
                    {resultList.state === 'success' && (
                        <div className="result_area">
                            <ResultList resultList={resultList.data} setPageNum={setPageNum} pageNum={pageNum} />
                        </div>
                    )}
                </CheckData>
            ) : (
                <>
                    {popular.current && (
                        <CheckData data={popular.current}>
                            {popular.current.state === 'success' && (
                                <div className="popular_area">
                                    <PopularList data={popular.current.data} getResult={getResult} setValue={setValue} />
                                </div>
                            )}
                        </CheckData>
                    )}
                </>
            )}

            <style jsx>{`
                .search_area {
                    position: relative;
                    background: #f8f8fa;
                    border-radius: 0.5rem;
                    input {
                        border: 0;
                        font-size: 1.8rem;
                        background: none;
                        &::placeholder {
                            color: #a2a2a2;
                        }
                        &:focus {
                            outline: none;
                        }
                        &:-webkit-autofill {
                            box-shadow: 0 0 0 1000px #f8f8fa inset;
                        }
                    }
                    .search_btn {
                        position: absolute;
                        top: 50%;
                        right: 2rem;
                        transform: translateY(-50%);
                        width: 1.8rem;
                        height: 1.8rem;
                        background: url(${process.env.AWS_IMAGE_URL}/images/menu/search_toggle.png) 0 0 no-repeat;
                        background-size: 200%;
                        z-index: 20;
                    }
                    &.active {
                        background: var(--main-color);
                        input {
                            color: #fff;
                            &::placeholder {
                                color: var(--main-color);
                            }
                        }
                        .search_btn {
                            background-position-x: 100%;
                        }
                    }
                }

                .popular_area,
                .result_area {
                    margin-top: 2.7rem;
                }
                .errMsg {
                    font-size: 1.6rem;
                    text-align: center;
                }
            `}</style>
        </>
    );
}
