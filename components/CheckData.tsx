export default function CheckData({ children, data }) {
    return <>{data.state === 'fail' ? <p className="error_msg">{data.data.message}</p> : children}</>;
}
