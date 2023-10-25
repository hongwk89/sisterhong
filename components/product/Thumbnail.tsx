import CustomImage from '@components/CustomImage';

export default function Thumbnail({ data, type }) {
    if (type === 'detailPage') {
        data.img = data.images[0].img;
        data.name = data.product.name;
        data.img_width = data.images[0].width;
        data.img_height = data.images[0].height;
        data.label = data.product.label;
    }

    return (
        <>
            <div className={`image ${type}`}>
                <CustomImage src={data.img} alt={data.name} width={type.includes('defaultPage') ? 300 : data.img_width} height={type.includes('defaultPage') ? 300 : data.img_height} priority={true} />
                {data.label !== '' && <span className="event">{data.label}</span>}
            </div>
            <style jsx>{`
                .image {
                    position: relative;
                    .event {
                        font-family: 'Roboto';
                        color: #fff;
                        background: #ff1500;
                        font-weight: 700;
                        padding: 0.5rem;
                        border: 0.3rem solid #fff;
                        line-height: 1;
                        white-space: pre-wrap;
                        position: absolute;
                        top: 4%;
                        right: 4%;
                        z-index: 10;
                        text-align: center;
                    }
                    &.defaultPage {
                        .event {
                            font-size: 1.8rem;
                        }
                        &.smallBanner {
                            .event {
                                font-size: 1.2rem;
                                padding: 0.4rem;
                                border-width: 0.2rem;
                            }
                        }
                    }
                    &.salePage {
                        display: block;
                        mask-image: linear-gradient(to top, transparent 0, black 10%);
                        .event {
                            font-size: 2rem;
                            padding: 0.8rem;
                        }
                    }
                    &.detailPage {
                        .event {
                            font-size: 2rem;
                            padding: 0.8rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
