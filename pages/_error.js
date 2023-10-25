import ErrorPage from '@components/ErrorPage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Error({ res, err }) {
    const router = useRouter();
    const [referer, setReferer] = useState(null);
    let explain = err || '';
    let errorData = {};
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    useEffect(() => {
        const referer = localStorage.getItem('url');

        setReferer(referer);
    }, []);

    if (statusCode === 404) {
        explain = '존재하지 않는 주소를 입력하셨거나\n 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.';
        errorData = {
            type: '404 Error',
            title: '죄송합니다.\n 찾을 수 없는 페이지를 요청하셨습니다.',
            explain,
            btn: '홈으로',
            link: '/'
        };
    } else {
        errorData = {
            type: 'Error',
            title: '죄송합니다. 에러가 발생하였습니다.',
            explain,
            btn: '홈으로',
            link: '/'
        };
    }

    return <>{referer && <ErrorPage data={errorData} explain={explain} referer={referer} path={router.asPath} />}</>;
}

Error.getInitialProps = ({ res, err }) => {
    return { res, err };
};

export default Error;
