import { review_pop_option } from '@components/cart/CartListOne';
import usePopToggle from '@hooks/usePopToggle';
import Link from 'next/link';
import ReviewPop from './ReviewPop';

const REVIEW_STATE = {
    0: '구매평작성',
    1: '구매평작성기한만료',
    2: '구매평작성완료'
};

export default function ReviewButton({ data, popData }) {
    const { popOn, popOpen, popClose } = usePopToggle();
    const totalState = [];

    data.map((list: review_pop_option) => {
        totalState.push(list.review_state);
    });

    const handleClick = () => {
        popOpen();
    };

    return (
        <>
            {popData.delivered_at && (
                <>
                    {data.length === 1 ? (
                        <div>
                            <Link legacyBehavior href={`/mypage/review/write?order_id=${popData.order_id}&option_idx=${data[0].ordered_options_idx}`} className="active">
                                <a className={`${data[0].review_state === 0 ? 'active' : 'disabled'}`}>{REVIEW_STATE[data[0].review_state]}</a>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {totalState.includes(0) && (
                                <div>
                                    <button type="button" className="active" onClick={handleClick}>
                                        {REVIEW_STATE[0]}
                                    </button>
                                    {popOn === 'on' && <ReviewPop data={data} popData={popData} popOn={popOn} popClose={popClose} />}
                                </div>
                            )}
                            {!totalState.includes(0) && totalState.includes(1) && (
                                <div>
                                    <button type="button" className="disabled" disabled>
                                        {REVIEW_STATE[1]}
                                    </button>
                                </div>
                            )}
                            {!totalState.includes(0) && !totalState.includes(1) && (
                                <div>
                                    <button type="button" className="disabled" disabled>
                                        {REVIEW_STATE[2]}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    <style jsx>{`
                        div {
                            text-align: right;
                            margin-top: 2rem;
                            a,
                            button {
                                display: inline-block;
                                font-size: 1.2rem;
                                padding: 0.6rem 0.8rem;
                                &.disabled {
                                    pointer-events: none;
                                    background: #e8e8e8;
                                    color: #a2a2a2;
                                }
                                &.active {
                                    background: var(--main-color);
                                    color: #fff;
                                }
                            }
                        }
                    `}</style>
                </>
            )}
        </>
    );
}
