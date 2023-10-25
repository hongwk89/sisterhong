import CheckData from '@components/CheckData';
import PageTitle from '@components/PageTitle';
import PRList from '@components/product/detailPage/productInfo/ProductReview/PRList';
import { useRouter } from 'next/router';
import sendAxios from 'utils/sendAxios';

export default function PhotoReviewDetail({ data }) {
    const router = useRouter();

    return (
        <>
            <PageTitle title="홍언니고기 - 포토리뷰 상세보기" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <h1>
                            <button type="button" className="backBtn" onClick={() => router.back()}>
                                <span className="hidden">뒤로가기</span>
                            </button>
                            포토리뷰 상세보기
                        </h1>
                        <div className="content">
                            <ul>
                                <PRList type="detail" data={data.data.review} />
                            </ul>
                        </div>
                        <style jsx>{`
                            @use 'styles/mixins';
                            h1 {
                                position: relative;
                                padding: 4rem 0;
                                text-align: center;
                                font-size: 2.2rem;
                                font-weight: 700;
                                .backBtn {
                                    display: block;
                                    position: absolute;
                                    top: 50%;
                                    left: 0;
                                    transform: translateY(-50%);
                                    width: 3.5rem;
                                    height: 3.5rem;
                                    @include mixins.arrow(1.3rem, 0.2rem, 45deg, left, #191919);
                                }
                            }
                            .content {
                                padding: 0 var(--side-padding);
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const query = context.query;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/product/review/${query.idx}`,
        params: { product_id: query.product_id }
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data
        }
    };
};
