import InnerHtml from '@components/product/detailPage/productInfo/InnerHtml';
import { useRef } from 'react';
import ContactFileOne from './ContactFileOne';

export const CATEGORY = { 1: '상품', 2: '결제', 3: '취소/환불', 4: '배송', 5: '기타' };

export default function ContactListOne({ data }) {
    const comment = data.comment;
    const dateArr = data.created_at.split('-');
    const date = dateArr[0] + '년 ' + dateArr[1] + '월 ' + dateArr[2] + '일';
    const liRef = useRef<HTMLLIElement>();
    const userText = useRef<HTMLParagraphElement>();
    const arrow = useRef<HTMLButtonElement>();
    const managerText = useRef<HTMLDivElement>();

    const handleClick = () => {
        if (liRef.current) {
            if (liRef.current.classList.value.includes('on')) {
                liRef.current.classList.remove('on');
                userText.current.classList.remove('on');
                arrow.current.classList.remove('on');
                if (managerText.current) {
                    managerText.current.classList.remove('on');
                }
            } else {
                liRef.current.classList.add('on');
                userText.current.classList.add('on');
                arrow.current.classList.add('on');
                if (managerText.current) {
                    managerText.current.classList.add('on');
                }
            }
        }
    };

    return (
        <>
            <li ref={liRef}>
                <div className="top_line">
                    <p>
                        <span>[{CATEGORY[data.property]}]</span>
                        <span>{comment === '' ? '미답변' : '답변'}</span>
                        <span>{date}</span>
                    </p>
                    <div>
                        <p className="toggle" ref={userText}>
                            {data.content}
                        </p>
                        <button type="button" className="arrow" ref={arrow} onClick={handleClick}>
                            <span className="hidden">답변열기</span>
                        </button>
                    </div>
                    <ul>
                        {data.images.map((list: string, idx: number) => (
                            <ContactFileOne key={idx} list={list} />
                        ))}
                    </ul>
                </div>
                {comment === '' ? (
                    <div className="bot_line">
                        <p>담당자가 확인 중에 있습니다. 조금만 기다려주세요!</p>
                    </div>
                ) : (
                    <div className="bot_line">
                        <InnerHtml data={comment} />
                    </div>
                )}
            </li>
            <style jsx global>{`
                .bot_line div p {
                    color: #707070;
                }
            `}</style>
            <style jsx>{`
                @use 'styles/mixins';
                li {
                    padding-bottom: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-bottom: 0.1rem solid #e8e8e8;
                    &:last-child {
                        padding-bottom: 0;
                        margin-bottom: 0;
                        border-bottom: none;
                    }
                    .top_line {
                        margin-bottom: 0.6rem;
                        > p {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: baseline;
                            font-size: 1.6rem;
                            color: #000;
                            font-weight: 500;
                            margin-bottom: 0.6rem;
                            span {
                                &:nth-child(2) {
                                    color: var(--main-color);
                                    margin: 0 0.5rem;
                                }
                                &:last-child {
                                    color: #a2a2a2;
                                    font-size: 1.2rem;
                                    font-weight: 400;
                                }
                            }
                        }
                        > div {
                            display: flex;
                            justify-content: space-between;
                            align-items: top;
                            font-size: 1.4rem;
                            p {
                                white-space: break-spaces;
                                display: block;
                                width: 90%;
                                word-break: break-all;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                word-wrap: break-word;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                line-height: 1.4em;
                                max-height: 2.8em;
                                &.on {
                                    max-height: none !important;
                                    -webkit-line-clamp: inherit !important;
                                }
                            }
                            .arrow {
                                display: block;
                                position: relative;
                                width: 2rem;
                                height: 2rem;
                                @include mixins.arrow(1rem, 0.1rem, 45deg, down, var(--main-color));
                                &.on {
                                    @include mixins.arrow(1rem, 0.1rem, 45deg, up, var(--main-color));
                                }
                            }
                        }
                        ul {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, 10rem);
                            gap: 1rem;
                            margin-top: 0.5rem;
                        }
                    }
                    .bot_line {
                        &:not(.noAnswer) {
                            height: 100%;
                            background: #f8f8fa;
                            border-top: 0.1rem solid #e8e8e8;
                            font-size: 1.4rem;
                            padding: 1.5rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
