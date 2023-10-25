import CheckData from '@components/CheckData';
import Gocaf from '@components/event/Gocaf';
import PageTitle from '@components/PageTitle';
import InnerHtml from '@components/product/detailPage/productInfo/InnerHtml';
import { useRouter } from 'next/dist/client/router';
import sendAxios from 'utils/sendAxios';
import React, { useEffect } from 'react';

export default function Event({ data, event_id }) {
    const router = useRouter();
    const anchor = router.asPath.split('#')[1];

    useEffect(() => {
        if (data.state !== 'success') {
            return;
        }
        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/event/hit`,
            data: { event_id }
        };
        sendAxios({ config, errFunc: (err) => console.log(err) }).then();
    }, [data.state, event_id]);

    return (
        <>
            <PageTitle title="홍언니고기 - 이벤트" />
            <CheckData data={data}>
                {data.state === 'success' && (
                    <>
                        {event_id === 'E1683855687361120' ? (
                            <Gocaf data={data.data.data.contents} anchor={anchor} />
                        ) : (
                            <div className="wrap">
                                <InnerHtml data={data.data.data.contents} anchor={anchor} />
                            </div>
                        )}
                        <style jsx>{`
                            .wrap {
                                padding: 2rem var(--side-padding);
                            }
                        `}</style>
                    </>
                )}
            </CheckData>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const event_id = context.query.event_id;

    const config = {
        method: 'get',
        url: `${process.env.API_HOST}/event?event_id=${event_id}`
    };
    const data = await sendAxios({ config, context });

    return {
        props: {
            data,
            event_id
        }
    };
};
