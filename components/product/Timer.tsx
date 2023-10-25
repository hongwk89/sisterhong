import CustomImage from '@components/CustomImage';
import useTimer from '@hooks/useTimer';
import { useMemo } from 'react';

interface timerParams {
    startDay: string;
    endDay: string;
    rightType?: 'sidePaddingInner' | 'sidePadding';
}

export default function Timer({ startDay, endDay, rightType = 'sidePaddingInner' }: timerParams) {
    const timer = useTimer({ init: endDay, begin: true, now: startDay, end: endDay });
    const oneDayLeft = useMemo(() => (new Date(endDay).getTime() - new Date(startDay).getTime()) / (60 * 60 * 1000), [endDay, startDay]);

    return (
        <>
            {oneDayLeft <= 24 && oneDayLeft > 0 && (
                <span className={`timer ${rightType}`}>
                    <span className="icon">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/timer.png`} alt="타이머 아이콘" width={40} height={40} />
                    </span>
                    <span className="time">{timer}</span>
                </span>
            )}
            <style jsx>{`
                .timer {
                    position: absolute;
                    top: 1.9rem;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    &.sidePadding {
                        right: calc(var(--side-padding) + 5px);
                    }
                    &.sidePaddingInner {
                        right: var(--side-padding-inner);
                    }
                    .icon {
                        width: 2rem;
                        line-height: 1;
                    }
                    .time {
                        font-family: 'roboto';
                        font-size: 1.8rem;
                        font-weight: 500;
                        line-height: 1;
                    }
                }
            `}</style>
        </>
    );
}
