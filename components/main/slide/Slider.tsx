import PlayerSlide from './PlayerSlide';
import ImageSlide from './ImageSlide';

export default function Slider({ slides, type }) {
    return (
        <>
            <div>{slides.length !== 0 && (type === 'image' ? <ImageSlide slides={slides} /> : <PlayerSlide slides={slides} />)}</div>
            <style jsx global>{`
                @use 'styles/mixins';
                .swiper-horizontal > .swiper-pagination-bullets,
                .swiper-pagination-bullets.swiper-pagination-horizontal {
                    width: auto;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .swiper-pagination-bullet {
                    background-color: #a2a2a2;
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 0.3rem;
                    opacity: 1;
                }
                .swiper-pagination-bullet-active {
                    background-color: var(--main-color);
                    width: 1.8rem;
                }
            `}</style>
        </>
    );
}
