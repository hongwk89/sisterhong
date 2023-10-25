import { useState } from 'react';
import InnerHtml from './product/detailPage/productInfo/InnerHtml';

export default function AskLists({ data }) {
    const [on, setOn] = useState(false);
    const handleClick = () => {
        setOn((prev) => !prev);
    };

    return (
        <>
            <li className={`askList ${on ? 'on' : ''}`}>
                <div className="title" onClick={handleClick}>
                    <span className="category">[{data.property_value}]</span>
                    <p className="text">{data.title}</p>
                    <span className="arrow">
                        <span className="hidden">내용 펼치기</span>
                    </span>
                </div>
                <div className="content">
                    <div>
                        <InnerHtml data={data.content} />
                    </div>
                </div>
            </li>
            <style jsx global>{`
                .askList {
                    .content {
                        p {
                            font-size: 1.4rem;
                            color: #707070;
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                @use 'styles/mixins';
                .askList {
                    padding: 1.5rem 0;
                    border-bottom: 0.1rem solid #e8e8e8;

                    .title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        column-gap: 1rem;
                        cursor: pointer;
                        .category {
                            font-size: 1.6rem;
                            color: #000;
                        }
                        .text {
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            color: #707070;
                            font-size: 1.6rem;
                            text-align: left;
                            flex-grow: 1;
                            flex-shrink: 1;
                            flex-basis: 100px;
                        }
                        .arrow {
                            position: relative;
                            width: 2rem;
                            height: 2rem;
                            @include mixins.arrow(1rem, 0.1rem, 45deg, down);
                        }
                    }
                    .content {
                        margin-top: 0.5rem;
                        height: 0;
                        overflow: hidden;
                        flex-basis: 100%;
                        background: #f8f8fa;
                        border-bottom: 0;
                        > div {
                            border: 0.1rem solid #e8e8e8;
                            padding: 1.5rem;
                        }
                    }
                    &.on {
                        .arrow {
                            @include mixins.arrow(1rem, 0.1rem, 45deg, up);
                        }
                        .content {
                            height: auto;
                        }
                    }
                }
            `}</style>
        </>
    );
}
