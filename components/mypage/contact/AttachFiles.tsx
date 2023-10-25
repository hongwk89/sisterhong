import Loading from '@components/animation/Loading';
import { ChangeEvent, useRef, useState } from 'react';
import ContactFileOne from './ContactFileOne';

const EXTENSION = ['jpeg', 'jpg', 'gif', 'png', 'heic'];

export default function AttachFiles({ imgList, setImgList }) {
    const [converting, setConverting] = useState(false);
    const file = useRef<HTMLInputElement>();

    const handleClick = () => {
        file.current.click();
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let { files } = e.target;

        try {
            const imgArr = await Promise.all(
                Array.from(files).map(async (file, idx) => {
                    const ext = file.name.toLowerCase().split('.').pop();

                    if (!EXTENSION.includes(ext)) {
                        throw '이미지파일(gif,jpg,jpeg,png,heic)만 업로드 가능합니다.';
                    }

                    if (ext === 'heic') {
                        const heic2any = require('heic2any');
                        setConverting(true);
                        return await fetch(URL.createObjectURL(file))
                            .then((res) => res.blob())
                            .then((blob) => heic2any({ blob, toType: 'image/jpeg', quality: 0.1 }))
                            .then((conversionResult) => {
                                setConverting(false);
                                return new File([conversionResult], file.name.split('.')[0] + '.jpeg');
                            })
                            .catch((e) => {
                                setConverting(false);
                                alert(e);
                            });
                    }

                    return file;
                })
            );

            setImgList((prev) => [...prev, ...imgArr]);
        } catch (e) {
            alert(e);
        }
    };

    const handleDelete = (idx: number) => {
        setImgList((prev) => prev.filter((file: File, index: number) => index !== idx));
    };

    return (
        <>
            <div className="attachList">
                <input type="file" ref={file} accept=".gif,.jpg,.png,.jpeg,.heic" onChange={handleChange} multiple />
                <ul>
                    {imgList.map((list: File, idx: number) => (
                        <ContactFileOne key={idx} handleDelete={() => handleDelete(idx)} list={list} />
                    ))}
                    <li onClick={handleClick}>
                        <div className="plus">
                            <span className="hidden">파일첨부</span>
                        </div>
                    </li>
                </ul>
            </div>
            <Loading converting={converting} />
            <style jsx>{`
                .attachList {
                    input {
                        &[type='file'] {
                            display: none;
                        }
                    }
                    ul {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                        gap: 1rem;
                        li {
                            position: relative;
                            display: block;
                            background: #f8f8fa;
                            cursor: pointer;
                            padding-top: 100%;
                            .plus {
                                &:before,
                                &:after {
                                    content: '';
                                    display: block;
                                    position: absolute;
                                    width: 2rem;
                                    height: 0.2rem;
                                    background: #a2a2a2;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                }
                                &:after {
                                    transform: translate(-50%, -50%) rotate(-90deg);
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
