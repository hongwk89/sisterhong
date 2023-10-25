import ErrorPage from '@components/ErrorPage';

export default function Error({ explain }) {
    let errorData;

    if (explain === '상품을 찾을 수 없습니다.') {
        errorData = {
            type: '',
            title: '죄송합니다.\n' + explain,
            explain: '',
            btn: '홈으로',
            link: '/'
        };
    } else {
        errorData = {
            type: 'Error',
            title: '죄송합니다.\n오류가 발생하였습니다.',
            explain,
            btn: '홈으로',
            link: '/'
        };
    }

    return (
        <>
            <ErrorPage data={errorData} explain={explain} />
        </>
    );
}

export async function getServerSideProps(context) {
    return {
        props: { explain: context.query.msg } // will be passed to the page component as props
    };
}
