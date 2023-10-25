import CustomImage from './CustomImage';

export default function TopBtn() {
    const moveTop = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <button type="button" id="topBtn" onClick={moveTop}>
                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/top.png`} width={135} height={135} alt="top"></CustomImage>
            </button>
            <style jsx>{`
                #topBtn {
                    position: fixed;
                    bottom: 13rem;
                    margin-left: calc(100% - var(--side-padding) - 5rem);
                    width: 5rem;
                    height: 5rem;
                    z-index: 8;
                    @media only screen and ((min-width: 500px)) {
                        margin-left: calc(((var(--max-width) - var(--gap)) / 2) - 6.5rem);
                    }
                }
            `}</style>
        </>
    );
}
