import ListDetailTop from './ListDetailTop';
import ListTop from './ListTop';

export default function MypageOrderListTop({ data, type, setTracking = null, pacelPop }) {
    return (
        <>
            {type === 'list' && <ListTop data={data} pacelPop={pacelPop} />}
            {type === 'detail' && <ListDetailTop data={data} setTracking={setTracking} pacelPop={pacelPop} />}
        </>
    );
}
