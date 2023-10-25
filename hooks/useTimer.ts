import { useEffect, useState } from 'react';
import getDateDiff from 'utils/dateDiff';

interface timer {
    init?: string | number;
    begin?: boolean;
    now?: string | number;
    end?: string | number;
    unit?: 's' | 'hms';
    reset?: boolean;
}

export default function useTimer({ init = null, begin = false, now = null, end = null, unit = 'hms', reset = false }: timer) {
    const [time, setTime] = useState(null);
    let date1, date2;

    if (unit === 'hms') {
        date1 = Object.prototype.toString.call(now) === '[object Date]' ? now : new Date(now);
        date2 = Object.prototype.toString.call(end) === '[object Date]' ? end : new Date(end);
    }

    useEffect(() => {
        if (unit === 'hms') {
            setTime(getDateDiff(date1, date2, unit));
        } else {
            setTime(init);
        }
    }, [init]);

    useEffect(() => {
        let timer = null;

        if (init) {
            if (begin) {
                if (unit === 'hms') {
                    timer = setInterval(function () {
                        const diffDate = getDateDiff(date1, date2, unit);

                        if (!diffDate) {
                            clearInterval(timer);
                            return;
                        }

                        date2.setSeconds(date2.getSeconds() - 1);

                        setTime(diffDate);
                    }, 1000);
                } else {
                    let endSec = init as number;

                    timer = setInterval(function () {
                        endSec--;

                        setTime(endSec);

                        if (endSec <= 0) {
                            clearInterval(timer);
                        }
                    }, 1000);
                }
            }
        }

        return () => clearInterval(timer);
    }, [begin, reset, init]);

    return time;
}
