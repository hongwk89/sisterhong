import InnerHtml from './product/detailPage/productInfo/InnerHtml';

export default function Popup({ data, popOn, popClose }) {
    return (
        <>
            <div className={`pop_bg ${popOn}`}>
                <div className="content fade">
                    <h1>
                        {data.title}
                        <button type="button" className="close" onClick={popClose}>
                            <span className="hidden">닫기</span>
                        </button>
                    </h1>
                    <div>
                        <InnerHtml data={data.text} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .pop_bg {
                    .content {
                        position: absolute;
                        padding: 3rem 1.5rem;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -55%);
                        width: 90%;
                        background: #fff;
                        h1 {
                            position: relative;
                            text-align: center;
                            font-size: 1.6rem;
                            font-weight: 500;
                            .close {
                                @include mixins.closeBtn;
                                position: absolute;
                                top: 50%;
                                right: 0;
                                transform: translateY(-50%);
                            }
                        }
                        div {
                            margin-top: 3rem;
                            font-size: 1rem;
                            height: 30rem;
                            overflow-y: auto;
                        }
                    }
                    &.on {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}
