import { useState } from 'react';

export default function useInput(initialValue: string, validator: Function) {
    const [value, setValue] = useState(initialValue);
    const [check, setCheck] = useState(value ? true : false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;

        setValue(value);

        if (typeof validator === 'function') {
            if (value !== '' && validator(value)) {
                setCheck(true);
            } else {
                setCheck(false);
            }
        }
    };

    return { value, onChange, 'data-check': check };
}

export function useInputVal(initVal: string) {
    const [value, setValue] = useState(initVal);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;

        setValue(value);
    };

    return { value, onChange };
}

export function useInputLength(maxLength: number, initialValue: string) {
    const [value, setValue] = useState(initialValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;

        if (value.length <= maxLength) {
            setValue(value);
            if (value.length === maxLength) {
                const next = event.target.nextSibling;

                if (next) {
                    (next.nextSibling as HTMLInputElement).focus();
                }
            }
        }
    };

    return { value, onChange };
}

/**
 * 생년월일 (회원가입)
 */
export function useInputBDay(init = '') {
    const [value, setValue] = useState(init);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;

        const next = event.target.nextSibling;

        if (event.target.name === 'birth1') {
            if (+value > 12) {
                return;
            }
        }

        if (event.target.name === 'birth2') {
            if (+value > 31) {
                return;
            }
        }

        if (value.length === 2) {
            if (next) {
                (next.nextSibling as HTMLInputElement).focus();
            }
        }

        setValue(value);
    };

    return { value, onChange };
}
