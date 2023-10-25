const TRACKINGLIST = ['입금\n대기', '결제\n완료', '출고\n완료', '배송중', '배송\n완료'];

export default function Tracking({ data }) {
    const status = data === '배송준비' ? '출고완료' : data;

    return (
        <>
            <ul>
                {TRACKINGLIST.map((text, idx) => (
                    <li key={idx} className={`${status === text.replace('\n', '') ? 'active' : ''}`}>
                        {text}
                    </li>
                ))}
            </ul>
            <style jsx>{`
                ul {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        height: 0.1rem;
                        transform: translateY(-50%);
                        background: #e8e8e8;
                    }
                    li {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        width: 5.8rem;
                        height: 5.8rem;
                        border-radius: 50%;
                        color: #a2a2a2;
                        border: 1px solid #e8e8e8;
                        font-size: 1.2rem;
                        background: #fff;
                        white-space: break-spaces;
                        &.active {
                            color: #fff;
                            background: var(--main-color);
                        }
                    }
                }
            `}</style>
        </>
    );
}
