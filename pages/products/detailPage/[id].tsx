import { useEffect, useRef, useState } from 'react';
import DetailPageTop from '@components/product/detailPage/DetailPageTop';
import sendAxios from 'utils/sendAxios';
import CheckData from '@components/CheckData';
import ProductDetail from '@components/product/detailPage/productInfo/ProductDetail';
import PageTab from '@components/PageTab';
import PurchaseBtn from '@components/product/detailPage/PurchaseBtn';
import PageTitle from '@components/PageTitle';
import Thumbnail from '@components/product/Thumbnail';

const TEXTS = ['상품정보', '구매후기', '기본정보'];

export default function DetailPage({ data, info, timer, id, tabNum }) {
    const tabRef = useRef<HTMLDivElement>(null);
    const [rvNum, setRvNum] = useState(0);
    const [tab, setTab] = useState(tabNum || 0);
    const [tabHeight, setTabHeight] = useState(0);
    const dataset = data.data;

    useEffect(() => {
        if (data.state === 'success') {
            const countUpHit = async () => {
                const config = {
                    method: 'post',
                    url: `${process.env.API_HOST}/product/hit/${id}`
                };
                await sendAxios({ config, errFunc: (err) => console.log(err) });
            };

            if (tabRef.current) {
                setTabHeight((tabRef.current.firstChild as HTMLDivElement).offsetHeight);
            }

            countUpHit();
        }
    }, []);

    useEffect(() => {
        if (dataset && tabNum) {
            setTimeout(() => {
                window.scrollTo({ left: 0, top: tabRef.current.offsetTop, behavior: 'smooth' });
            }, 200);
        }

        kakaoPixel(process.env.KAKAO_PIXEL).viewContent({
            id: data.data.product.product_id
        });
    }, []);

    return (
        <>
            <PageTitle title={`홍언니고기 - ${dataset.product.name}`} />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        <Thumbnail data={dataset} type="detailPage" />
                        <div className="productInfo salePage">
                            <DetailPageTop data={dataset.product} timer={timer} />
                        </div>
                        <div id="detailPageTab" ref={tabRef}>
                            <PageTab texts={TEXTS} tab={tab} setTab={setTab} tabRef={tabRef} rvNum={rvNum} />
                        </div>
                        <div className="productDetail">
                            <CheckData data={info}>
                                <ProductDetail tab={tab} data={dataset} info={info} setRvNum={setRvNum} />
                            </CheckData>
                        </div>
                        <div>
                            <PurchaseBtn data={dataset} />
                        </div>
                        <style jsx>{`
                            $tabHeight: ${tabHeight}px;
                            .productImg {
                                position: relative;
                                span {
                                    display: block;
                                }
                                .event {
                                    font-family: 'Roboto';
                                    color: #fff;
                                    background: #ff1500;
                                    font-weight: 700;
                                    font-size: 2rem;
                                    border: 0.4rem solid #fff;
                                    padding: 0.8rem;
                                    line-height: 1;
                                    white-space: pre-wrap;
                                    position: absolute;
                                    top: 4%;
                                    right: 4%;
                                    z-index: 10;
                                    text-align: center;
                                }
                            }
                            .productInfo {
                                position: relative;
                                padding: 1.5rem 6rem 2rem var(--side-padding);
                            }
                            #detailPageTab {
                                padding-top: $tabHeight;
                                position: relative;
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const tabNum = parseInt(context.query.tabNum);
    const timer = new Date().toString().split(' GMT')[0];

    const config1 = {
        method: 'get',
        url: `${process.env.API_HOST}/product/detail/${id}`
    };
    const data = await sendAxios({ config: config1, context });

    if (data.state === 'fail') {
        return {
            redirect: {
                permanent: false,
                destination: `/error/?msg=${encodeURIComponent(data.data.message)}`
            }
        };
    }

    const config2 = {
        method: 'get',
        url: `${process.env.API_HOST}/product/description/${id}`
    };
    const info = await sendAxios({ config: config2, context });

    return {
        props: {
            key: id,
            data,
            info,
            timer,
            id,
            tabNum
        }
    };
}
