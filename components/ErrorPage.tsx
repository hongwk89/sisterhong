import { useRouter } from 'next/dist/client/router';
import sendError from 'utils/sendError';
import PageTitle from './PageTitle';

export default function ErrorPage({ data, explain, referer = null, path = null }) {
    const router = useRouter();
    const msg = referer ? explain + ' (url:' + router.asPath + ', referer:' + referer + ', path:' + path + ')' : explain + ' (url:' + router.asPath + ')';

    sendError(msg);

    return (
        <>
            <PageTitle title="홍언니고기 - 에러페이지" />
            <div className="wrap">
                <h1>{data.type}</h1>
                <p>{data.title}</p>
                <p>{data.explain}</p>
                <p>
                    궁금하신 점은 고객센터를 통해 문의주시기 바랍니다.
                    <br /> 감사합니다.
                </p>
                <div className="btn">
                    <a href={data.link}>
                        <span className="commonButton typeRed">{data.btn}</span>
                    </a>
                </div>
            </div>
            <style jsx>{`
                .wrap {
                    text-align: center;
                    padding: 4rem var(--side-padding);
                    h1 {
                        font-family: 'roboto';
                        font-size: 3rem;
                        font-weight: 700;
                        color: var(--main-color);
                        margin-bottom: 2rem;
                    }
                    p {
                        white-space: pre-wrap;
                        &:nth-of-type(1) {
                            font-size: 1.8rem;
                            font-weight: 700;
                            margin-bottom: 2rem;
                        }
                        &:nth-of-type(2) {
                            font-size: 1.4rem;
                            margin-bottom: 2rem;
                        }
                        &:nth-of-type(3) {
                            font-size: 1.4rem;
                            font-weight: 500;
                            margin-bottom: 2rem;
                        }
                    }
                    .btn {
                        display: block;
                        margin: 0 auto;
                        width: 13rem;
                        height: 4rem;
                        span {
                            padding: 0;
                            height: 100%;
                            text-align: center;
                            font-size: 1.6rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
