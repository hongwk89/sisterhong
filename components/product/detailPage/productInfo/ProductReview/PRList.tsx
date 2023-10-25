import CustomImage from '@components/CustomImage';
import { useState, useRef, useEffect } from 'react';
import getfontHeight from 'utils/getFontHeight';
import { ReviewStar } from './ReviewStar';

interface image {
    image: string;
    width: number;
    height: number;
}

export default function PRList({ data, tab = null, type = null }) {
    const [on, setOn] = useState(type === 'detail' ? 'on' : '');
    const content = useRef<HTMLDivElement>();
    const [togBtn, setTogBtn] = useState(false);
    const admin_review_ref = useRef<HTMLDivElement>();
    const comment = data.comment === '' ? '' : JSON.parse(data.comment)[0];

    const toggle = () => {
        const oneLine_h = getfontHeight('Noto Sans KR', '1.4rem');
        const lines = content.current.scrollHeight / oneLine_h;

        if (lines > 2 || comment !== '' || data.images.length !== 0) {
            setTogBtn(true);
        }
    };

    const handleToggle = () => {
        if (type === 'detail') return;

        setOn((prev) => {
            if (prev === 'on') {
                return '';
            }

            return 'on';
        });
    };

    const admin_review = (display: 'block' | 'none') => {
        admin_review_ref.current.style.display = display;
    };

    useEffect(() => {
        if (tab === 1) {
            toggle();
        }
    }, [data, tab]);

    return (
        <>
            <li className="wrap">
                <div className="top" onClick={handleToggle}>
                    {data.best_review === 1 && <span className="best">BEST</span>}
                    <span className="name">{data.user_id}</span>
                    <span className="date">{data.created_at}</span>
                    {data.images.length > 0 && (
                        <span className="picIcon image">
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/review_img.png`} alt="" width={36} height={36} />
                        </span>
                    )}
                    {togBtn && (
                        <span className={`arrow ${on ? 'on' : ''}`}>
                            <span className="hidden">리뷰 토글 버튼</span>
                        </span>
                    )}
                </div>
                <div className="mid">
                    <ReviewStar score={data.score} />
                    <span>[{data.option_name}]</span>
                    <ul>
                        {data.hashtag?.map((list: string, idx: number) => (
                            <li key={idx}>{list}</li>
                        ))}
                    </ul>
                </div>
                <div className={`content ${on ? 'on' : ''}`} ref={content}>
                    <p>{data.content.replace(/\<p\>|\<\/p\>/g, '')}</p>
                    {comment !== '' && (
                        <div className={`admin_review ${on}`}>
                            <button type="button" className="icon" onClick={() => admin_review('block')}>
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/chat.png`} width={40} height={40} alt="관리자 댓글 열기 버튼" />
                            </button>
                            <div ref={admin_review_ref}>
                                <h5>관리자 댓글</h5>
                                <br />
                                <p>{comment.comment.replace(/\<p\>|\<\/p\>/g, '')}</p>
                                <span>{comment.c_created_at}</span>
                                <button type="button" onClick={() => admin_review('none')}>
                                    <span className="hidden">관리자 댓글 닫기 버튼</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {data.images.map((list: image, idx: number) => (
                        <div className={`image ${on}`} key={idx}>
                            <CustomImage src={list.image} width={list.width} height={list.height} alt="리뷰이미지" />
                        </div>
                    ))}
                </div>
            </li>
            <style jsx>{`
                @use 'styles/mixins';
                $fontSize: 1.4rem;
                .wrap {
                    padding: 2rem 0;
                    border-bottom: 0.1rem solid #e8e8e8;
                    .top {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        .best {
                            display: inline-block;
                            padding: 0.2rem 0.5rem;
                            border: 0.1rem solid var(--main-color);
                            color: var(--main-color);
                            font-weight: 700;
                        }
                        .name {
                            font-size: 1.6rem;
                            font-weight: 500;
                        }
                        .date {
                            font-size: 1.2rem;
                            color: #707070;
                        }
                        .picIcon {
                            width: 1.8rem;
                        }
                        .arrow {
                            position: relative;
                            width: 2rem;
                            height: 2rem;
                            @include mixins.arrow(1rem, 0.1rem, 45deg, down);
                            margin-left: auto;
                            &.on {
                                @include mixins.arrow(1rem, 0.1rem, 45deg, up, var(--main-color));
                            }
                        }
                    }
                    .mid {
                        padding-top: 0.5rem;
                        span {
                            display: block;
                            color: #707070;
                            font-size: 1.2rem;
                            margin-top: 0.5rem;
                        }
                        ul {
                            display: flex;
                            flex-wrap: wrap;
                            margin-top: 0.5rem;
                            gap: 0.5rem;
                            li {
                                font-size: 1.2rem;
                                font-weight: 500;
                                padding: 0.5rem 1rem;
                                background: #f8f8fa;
                                border-radius: 0.8rem;
                            }
                        }
                    }
                    .content {
                        margin-top: 1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        max-height: calc($fontSize * 1.4 * 2);
                        p {
                            white-space: pre-wrap;
                            font-size: $fontSize;
                        }
                        .image {
                            display: none;
                            margin-top: 1rem;
                            &.on {
                                display: block;
                            }
                        }
                        &.on {
                            overflow: none;
                            -webkit-line-clamp: initial;
                            max-height: none;
                        }
                    }
                    .admin_review {
                        display: none;
                        margin-top: 1rem;
                        &.on {
                            display: block;
                        }
                        .icon {
                            width: 2rem;
                        }
                        div {
                            display: none;
                            position: relative;
                            margin-top: 0.5rem;
                            background: #f8f8fa;
                            padding: 1.8rem 1.5rem 1rem;
                            clip-path: polygon(0 0.8rem, 0.5rem 0.8rem, 1.25rem 0, 2rem 0.8rem, 100% 0.8rem, 100% 100%, 0 100%);
                            h5 {
                                display: inline-block;
                                font-size: 1rem;
                                color: #767676;
                                padding: 0.2rem 0;
                                border-bottom: 0.1rem solid #767676;
                                font-weight: 400;
                                margin-bottom: 0.7rem;
                            }
                            p {
                                font-size: 1.2rem;
                                font-weight: 500;
                            }
                            span {
                                display: block;
                                margin-top: 1rem;
                                text-align: right;
                                color: #707070;
                                font-size: 1rem;
                            }
                            button {
                                position: absolute;
                                width: 2rem;
                                height: 2rem;
                                top: 1.8rem;
                                right: 1.5rem;
                                @include mixins.arrow(1rem, 0.1rem, 45deg, up, #707070);
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
