import AttachFiles from '@components/mypage/contact/AttachFiles';
import { CATEGORY } from '@components/mypage/contact/ContactListOne';
import MypageTitle from '@components/mypage/MypageTitle';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function ContactWrite() {
    const type = useRef<HTMLSelectElement>();
    const contents = useRef<HTMLTextAreaElement>();
    const noticeRef = useRef<HTMLParagraphElement>();
    const writePop = useRef<HTMLDivElement>();
    const [imgList, setImgList] = useState([]);
    const fileRef = useRef<HTMLDivElement>();
    const gridRef = useRef<HTMLDivElement>();

    const handleSubmit = async () => {
        const typeVal = type.current.value;
        const contentsVal = contents.current.value;

        if (typeVal === '') {
            alert('문의유형을 선택해주세요.');
            return;
        }

        if (contentsVal.length < 10) {
            alert('내용은 최소 10자 이상 남겨주세요.');
            return;
        }

        const imgTotalSize = imgList.reduce((tot, cur) => (tot += cur.size), 0);
        const imgMB = imgTotalSize / 1024 ** 2;

        if (imgMB > 9) {
            alert('첨부 이미지들의 총 합이 9MB 넘을 수 없습니다.');
            return;
        }

        const formData = new FormData();

        imgList.map((img) => {
            formData.append('files[]', img);
        });

        formData.append('contents', contentsVal);
        formData.append('type', typeVal);

        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/articles/ask`,
            data: formData
        };

        await sendAxios({ config, resFunc: () => writePop.current.classList.add('on'), errFunc: (err) => alert(err.message) });
    };

    const handleChange = (e) => {
        contents.current.value = '';
        if (e.target.selectedIndex === 3) {
            noticeRef.current.style.display = 'block';
        } else {
            noticeRef.current.style.display = 'none';
        }
    };

    const handleClick = () => {
        noticeRef.current.style.display = 'none';
        contents.current.focus();
    };

    useEffect(() => {
        const file = fileRef.current.getBoundingClientRect().left + parseInt(window.getComputedStyle(fileRef.current, null).getPropertyValue('padding-left').replace('px', ''));
        const grid = gridRef.current.getBoundingClientRect().left;

        (document.querySelector('#loading') as HTMLDivElement).style.marginLeft = -(file - grid) + 'px';
    }, []);

    return (
        <>
            <PageTitle title="홍언니고기 - 문의하기" />
            <MypageTitle back={true} url="/mypage/contact">
                문의하기
            </MypageTitle>
            <div className="grid" ref={gridRef}>
                <span>문의유형</span>
                <div>
                    <div className="selectBox">
                        <select defaultValue="" required ref={type} onChange={handleChange}>
                            <option value="" hidden disabled>
                                선택하세요.
                            </option>
                            {Object.keys(CATEGORY).map((key) => (
                                <option key={key} value={key}>
                                    {CATEGORY[key]}
                                </option>
                            ))}
                        </select>
                        <span className="arrow"></span>
                    </div>
                </div>
                <span>내용</span>
                <div>
                    <textarea ref={contents}></textarea>
                    <p className="notice" ref={noticeRef} onClick={handleClick}>
                        신선식품 특성상 취소 및 환불이
                        <br /> 불가할 수 있습니다.
                    </p>
                </div>
                <span className="alignCenter">
                    <span>파일업로드</span>
                </span>
                <div className="file" ref={fileRef}>
                    <AttachFiles imgList={imgList} setImgList={setImgList} />
                </div>
            </div>
            <div className="btnArea">
                <button type="button" className="commonButton typeRed" onClick={handleSubmit}>
                    문의등록하기
                </button>
            </div>
            <div className="pop_bg" ref={writePop}>
                <div className="content">
                    <h3>문의가 등록되었습니다.</h3>
                    <div className="btns">
                        <Link legacyBehavior href="/mypage/contact">
                            <a className="commonButton typeRed">문의내역 확인하기</a>
                        </Link>
                        <Link legacyBehavior href="/">
                            <a className="commonButton typeWhite">첫 화면으로 가기</a>
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                $border: 0.1rem solid #707070;
                $height: 3.5rem;
                $padding: 0.75rem;
                .grid {
                    padding: 0 var(--side-padding);
                    display: grid;
                    grid-template-columns: 9rem auto;
                    > span {
                        display: block;
                        border-bottom: $border;
                        font-size: 1.6rem;
                        font-weight: 500;
                        background: #f8f8fa;
                        text-align: center;
                        line-height: calc(($padding * 2) + $height);
                        &:first-of-type {
                            border-top: $border;
                        }
                        &.alignCenter {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                    > div {
                        position: relative;
                        border-bottom: $border;
                        padding: $padding;
                        textarea {
                            display: block;
                            width: 100%;
                            height: 15rem;
                            border: 0.1rem solid #a2a2a2;
                            padding: 0.7rem;
                            font-size: 1.2rem;
                        }
                        .notice {
                            display: none;
                            position: absolute;
                            top: calc($padding);
                            left: calc($padding);
                            width: calc(100% - ($padding) * 2);
                            height: calc(100% - ($padding) * 2);
                            padding: 0.7rem;
                            font-size: 1.2rem;
                            color: #aaa;
                            z-index: 1;
                        }
                        &:first-of-type {
                            border-top: $border;
                        }
                    }
                }
                .btnArea {
                    padding: 2rem var(--side-padding);
                    margin-bottom: 3rem;
                }
                .pop_bg {
                    .content {
                        position: absolute;
                        top: 50%;
                        left: 5%;
                        width: 90%;
                        padding: 3rem;
                        background: #fff;
                        transform: translateY(-55%);
                        border-radius: 1rem;
                        h3 {
                            font-size: 1.8rem;
                            font-weight: 500;
                            margin-bottom: 4rem;
                            text-align: center;
                        }
                        .btns .typeWhite {
                            margin-top: 1rem;
                            color: #191919;
                            border-color: #aaa;
                            border-width: 0.05rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
