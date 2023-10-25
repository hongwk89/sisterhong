import CustomImage from '@components/CustomImage';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

function InnerImage({ oversize, src, width, height, id }) {
    if (oversize) {
        return <CustomImage src={src} width={width} height={height} id={id} alt="설명 이미지" />;
    }

    return (
        <span style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}>
            <CustomImage src={src} width={width} height={height} id={id} alt="설명 이미지" />
        </span>
    );
}

const InnerHtml = ({ data, anchor = null }) => {
    const boardRef = useRef<HTMLDivElement>();
    const imgArr = [];
    const regExp = /\<a.*?\>\<img.*?\>\<\/a\>|\<img.*?\>/g;
    const [splitData, setSplitData] = useState([]);
    const [obj, setObj] = useState(null);

    let match: RegExpExecArray;
    while ((match = regExp.exec(data)) !== null) {
        imgArr.push(match[0]);
    }

    useEffect(() => {
        setSplitData(data.split(regExp));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setObj(document.querySelector('#' + anchor));
        }, 200);
    }, [splitData]);

    useEffect(() => {
        if (obj) {
            window.scrollTo({ left: 0, top: obj.offsetTop, behavior: 'smooth' });
        }
    }, [obj]);

    return (
        <>
            <div className="board" ref={boardRef}>
                {splitData.map((list: string, idx: number) => {
                    const el = imgArr[idx];
                    const extract = { img: { src: null, width: null, height: null, id: null }, a: { href: null, target: null } };
                    const content_width = boardRef.current.offsetWidth;

                    if (el) {
                        if (el.includes('href')) {
                            extract.a.href = el.match(/href\=\"([^\"]+)\"/)[1];
                            extract.a.target = el.includes('target') ? '_blank' : '_self';
                        }
                        if (el.includes('title')) {
                            extract.img.id = el.split(/title\=\"/)[1].split('"')[0];
                        }
                        extract.img.src = el.match(/src\=\"([^\"]+)\"/)[1];
                        extract.img.width = el.match(/width\=\"([^\"]+)\"/) ? el.match(/width\=\"([^\"]+)\"/)[1] : 500;
                        extract.img.height = el.match(/height\=\"([^\"]+)\"/) ? el.match(/height\=\"([^\"]+)\"/)[1] : 100;
                    }

                    return (
                        <div key={idx}>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(list) }} className="text"></div>
                            {el &&
                                (el.includes('href') ? (
                                    <Link href={extract.a.href} target={extract.a.target} passHref>
                                        <InnerImage oversize={extract.img.width >= content_width} src={extract.img.src} width={extract.img.width} height={extract.img.height} id={extract.img.id} />
                                    </Link>
                                ) : (
                                    <InnerImage oversize={extract.img.width >= content_width} src={extract.img.src} width={extract.img.width} height={extract.img.height} id={extract.img.id} />
                                ))}
                        </div>
                    );
                })}
            </div>
            <style jsx global>{`
                .board {
                    font-size: 1.2rem;
                    span,
                    strong {
                        vertical-align: baseline;
                    }
                    p {
                        span {
                            > * {
                                color: inherit !important;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
};

export default InnerHtml;
