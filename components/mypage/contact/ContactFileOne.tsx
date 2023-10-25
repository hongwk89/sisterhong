import Image from 'next/legacy/image';

export default function ContactFileOne({ handleDelete = null, list }) {
    const src = handleDelete ? URL.createObjectURL(list) : list.image;

    return (
        <>
            <li>
                {handleDelete && <span className="close" onClick={handleDelete}></span>}
                <Image src={src} alt="첨부파일" layout="fill" objectFit="cover" />
            </li>
            <style jsx>{`
                @use 'styles/mixins';
                li {
                    padding-top: 100%;
                    display: block;
                    background: #f8f8fa;
                    position: relative;
                    .close {
                        @include mixins.closeBtn(0.8rem, 0.1rem);
                        position: absolute;
                        top: 0.5rem;
                        right: 0.5rem;
                        z-index: 5;
                        background: #fff;
                        border-radius: 50%;
                        width: 1.5rem;
                        height: 1.5rem;
                        border: 0.1rem solid var(--main-color);
                    }
                }
            `}</style>
        </>
    );
}
