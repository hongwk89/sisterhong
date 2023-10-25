import CustomImage from '@components/CustomImage';
import Link from 'next/link';
import React from 'react';

export default React.memo(function MainBannerContent() {
    const idx = Math.floor(Math.random() * 2) + 1;

    return (
        <>
            <section id="main_banner">
                <Link legacyBehavior href="/">
                    <a className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/mainBanner/main_banner_content${idx}.png`} width={720} height={937} alt="메인 배너 내용" priority={true} />
                    </a>
                </Link>
            </section>
            <style jsx>{`
                $idx: ${idx};
                #main_banner {
                    position: sticky;
                    top: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100vh;
                    max-width: calc((var(--max-width) - var(--gap)) / 2);
                    overflow: hidden;
                    &:before,
                    &:after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '';
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    &:before {
                        background: url(${process.env.AWS_IMAGE_URL}/images/mainBanner/main_banner_bg${idx}.png) center bottom no-repeat;
                        background-size: cover;
                        opacity: 0.7;
                        z-index: -2;
                    }
                    &:after {
                        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
                        z-index: -1;
                    }
                    .image {
                        display: block;
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
});
