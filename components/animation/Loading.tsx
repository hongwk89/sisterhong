export default function Loading({ converting }) {
    return (
        <>
            <div id="loading" style={{ display: `${converting ? 'block' : 'none'}` }}>
                <div className="icon">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" preserveAspectRatio="none" />
                    </svg>
                </div>
            </div>
            <style jsx>{`
                #loading {
                    width: 100%;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    height: 100%;
                    position: fixed;
                    top: 0;
                    z-index: 200;
                    background: rgba(255, 255, 255, 0.7);
                    .icon {
                        position: absolute;
                        width: 7rem;
                        height: 7rem;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -55%);
                        svg {
                            animation: 2s linear infinite svg-animation;
                            circle {
                                animation: 1.4s ease-in-out infinite both circle-animation;
                                display: block;
                                fill: transparent;
                                stroke: var(--main-color);
                                stroke-linecap: round;
                                stroke-dasharray: 283;
                                stroke-dashoffset: 280;
                                stroke-width: 10px;
                                transform-origin: 50% 50%;
                            }
                        }
                    }
                }
                @keyframes svg-animation {
                    0% {
                        transform: rotateZ(0deg);
                    }
                    100% {
                        transform: rotateZ(360deg);
                    }
                }
                @keyframes circle-animation {
                    0%,
                    25% {
                        stroke-dashoffset: 280;
                        transform: rotate(0);
                    }
                    50%,
                    75% {
                        stroke-dashoffset: 75;
                        transform: rotate(45deg);
                    }
                    100% {
                        stroke-dashoffset: 280;
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
}
