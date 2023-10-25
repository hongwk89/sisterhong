import React from 'react';

export default function onlyNumber(key = null, callback = null) {
    const onKeyDown = (event: React.KeyboardEvent) => {
        const test = /([0-9]|Backspace|Enter|Tab|Del|ArrowLeft|ArrowRight)/g;

        if (!test.test(event.key)) {
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.key === key) {
            callback();
        }
    };

    const onWheel = (event) => {
        event.target.blur();
        return false;
    };

    return { onKeyDown, onWheel };
}
