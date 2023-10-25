import Slider from '@components/main/slide/Slider';
import SellList from '@components/main/SellList';
import sendAxios from 'utils/sendAxios';
import CheckData from '@components/CheckData';
import MainPopup from '@components/main/popup/MainPopup';
import Promotion from '@components/main/Promotion';
import Benefit from '@components/main/Benefit';
import MidBanner from '@components/main/MidBanner';
import BestReview from '@components/main/BestReview';
import BotBanner from '@components/main/BotBanner';
import PageTitle from '@components/PageTitle';

export default function Home({ slide, best, youtube }) {
    return (
        <>
            <PageTitle title="홍언니고기" />
            <article className="mainSlide">
                <CheckData data={slide}>{slide.state === 'success' && <Slider slides={slide.data} type="image" />}</CheckData>
            </article>
            <article>
                <CheckData data={best}>
                    {best.state === 'success' && (
                        <SellList lists={best.data} listWidth={2.5}>
                            베스트셀러
                        </SellList>
                    )}
                </CheckData>
            </article>
            <article className="youtube">
                <h2>셀럽들도 사랑한 홍언니고기</h2>
                <CheckData data={youtube}>{youtube.state === 'success' && <Slider slides={youtube.data} type="youtube" />}</CheckData>
            </article>
            <article>
                <Promotion />
            </article>
            <div>
                <MidBanner />
            </div>
            <article>
                <Benefit />
            </article>
            <article className="bestReview">
                <h2>BEST PHOTO REVIEW</h2>
                <BestReview />
            </article>
            <div>
                <BotBanner />
            </div>
            <MainPopup name="sisReviewPop" url="/review/alarm" />
            <MainPopup name="sisNoticePop" url="/banner/list/main_popup" />
            <style jsx global>{`
                article {
                    &:not(.mainSlide, .youtube) {
                        padding: 0 var(--side-padding);
                    }
                    &:not(.mainSlide) {
                        h2 {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            font-size: 2rem;
                            font-weight: 700;
                            margin-bottom: 1.2rem;
                            a {
                                font-weight: 400;
                                font-size: 1.4rem;
                                color: #707070;
                            }
                        }
                    }
                }
            `}</style>
            <style jsx>{`
                article,
                div {
                    margin-bottom: 4rem;
                }
                .sns {
                    display: flex;
                    justify-content: space-between;
                    gap: 3%;
                    a {
                        display: block;
                        width: 100%;
                    }
                }
                .youtube {
                    background: #f8f8fa;
                    h2 {
                        padding: 1.5rem 1.5rem 0;
                    }
                }
                .bestReview {
                    background: #f8f8fa;
                    padding: var(--side-padding);
                    ul {
                        max-height: 27rem;
                        overflow-y: auto;
                    }
                }
            `}</style>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const apis = [
        { method: 'get', url: `${process.env.API_HOST}/banner/list/top` },
        { method: 'get', url: `${process.env.API_HOST}/main/products?property=best` },
        { method: 'get', url: `${process.env.API_HOST}/main/products?property=youtube` }
    ];

    const requests = apis.map((config) => sendAxios({ config, context }));

    const apiName = await Promise.all(requests);

    return { props: { slide: apiName[0], best: apiName[1], youtube: apiName[2] } };
};
