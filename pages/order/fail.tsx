import PageTitle from '@components/PageTitle';

export default function Fail({ data }) {
    return (
        <>
            <PageTitle title="홍언니고기 - 주문실패" />
            <p className="error_msg">주문이 실패하였습니다. {data}</p>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const text = context.query.message || context.query.text;

    return {
        props: {
            data: text
        }
    };
};
