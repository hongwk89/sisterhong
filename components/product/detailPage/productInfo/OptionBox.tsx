import useCalcList from '@hooks/useCalcList';
import { useEffect, useRef } from 'react';
import getIndex from 'utils/getIndex';
import OptionBoxList from './OptionBoxList';
import SelectedList from './SelectedList';

interface option {
    group: string;
    group_id: string;
    idx: number;
    option_detail: [];
    price: number;
    promotion: [];
    sold_out: 'Y' | 'N';
    inventory: number;
    limitation: number;
}

export default function OptionBox({ type, option, text, updatePrice, idx, setCartData }) {
    const { selectedList, updateSelectedList, total } = useCalcList();
    const sbList = useRef<HTMLUListElement>();
    const arrow = useRef<HTMLSpanElement>();

    const closeSB = () => {
        const ul = sbList.current;
        const ar = arrow.current;

        ul.classList.remove('on');
        ar.classList.remove('on');
        ul.scrollTo(0, 0);
    };

    const openSB = () => {
        const ul = sbList.current;
        const ar = arrow.current;

        if (!ul.className.includes('on')) {
            ul.className += ' on';
            ar.className += ' on';
        } else {
            closeSB();
        }
    };

    const handleSelect = (e: React.TouchEvent | React.MouseEvent, params: option) => {
        if (params.sold_out === 'Y') {
            alert('품절된 상품입니다.');
            return;
        }

        const target = e.currentTarget as HTMLLIElement;
        const li_idx = getIndex(target, target.parentNode.childNodes);

        if (li_idx !== 0 && target.matches('li')) {
            if (selectedList.some((val) => val.idx === params.idx)) {
                alert('이미 선택된 옵션입니다');
                return;
            }
            updateSelectedList(params.idx, { ...params, amount: 1 }, 'add');
        }

        closeSB();
    };

    useEffect(() => {
        updatePrice(idx, total);
    }, [total]);

    useEffect(() => {
        setCartData((prev) => ({ ...prev, [type]: selectedList.map((list) => ({ option_idx: list.idx, amount: list.amount })) }));
    }, [selectedList]);

    return (
        <>
            <div className="option">
                <div className="selectBox">
                    <ul ref={sbList}>
                        <li className="first optionList" onClick={openSB}>
                            <h5>{text}</h5>
                            <span className="arrow" ref={arrow}></span>
                        </li>
                        {option.map((opt: option, idx: number) => (
                            <OptionBoxList key={idx} opt={opt} handleSelect={handleSelect} />
                        ))}
                    </ul>
                </div>
                {selectedList.map((list, idx) => (
                    <SelectedList key={idx} list={list} updateSelectedList={updateSelectedList} />
                ))}
                {type === 'options' && option[0].limitation !== 100000 && <p className="notice">해당 상품은 최대 {option[0].limitation}개까지 구매가능합니다</p>}
            </div>
            <style jsx global>{`
                @use 'styles/mixins';
                $opt_height: 4.5rem;
                .option {
                    background: #f8f8fa;
                    padding: 1.5rem;
                    border-radius: 0.8rem;
                    margin-bottom: 1.5rem;
                    .selectBox {
                        position: relative;
                        > ul {
                            width: 100%;
                            height: $opt_height;
                            overflow-y: hidden;
                            transition: height 0.3s;
                            > li {
                                display: flex;
                                flex-wrap: wrap;
                                align-items: center;
                                min-height: $opt_height;
                                background: #fff;
                                padding: 1rem 1.5rem;
                                cursor: pointer;
                                h5 {
                                    flex: 1 100%;
                                    flex-shrink: 0;
                                    width: 100%;
                                    font-size: 1.6rem;
                                    color: #a2a2a2;
                                    font-weight: normal;
                                    padding-left: 0.5rem;
                                }
                                .arrow {
                                    display: block;
                                    position: absolute;
                                    right: 1rem;
                                    top: calc($opt_height / 2);
                                    width: 2.5rem;
                                    height: 2.5rem;
                                    transform: translateY(-50%);
                                    @include mixins.arrow(1.5rem, 0.2rem, 45deg, down);
                                    &.on {
                                        @include mixins.arrow(1.5rem, 0.2rem, 45deg, up, var(--main-color));
                                    }
                                    @at-root .selectBox ul.on + .arrow {
                                        z-index: 10;
                                    }
                                }
                            }
                            &.on {
                                box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
                                z-index: 10;
                                height: auto;
                                max-height: calc(7 * $opt_height);
                                overflow-y: auto;
                                > li {
                                    border-bottom: 1px solid #e8e8e8;
                                    white-space: normal;
                                    overflow: visible;
                                    &.first {
                                        position: sticky;
                                        top: 0;
                                    }
                                    &:not(.first) {
                                        h5 {
                                            color: #191919;
                                        }
                                    }
                                    &:last-child {
                                        border-bottom: 0;
                                    }
                                }
                            }
                        }
                    }
                    .notice {
                        color: var(--main-color);
                        margin-top: 1rem;
                        font-size: 1.2rem;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    );
}
