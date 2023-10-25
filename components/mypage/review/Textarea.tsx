import React, { useEffect, useState } from 'react';

export default function Textarea({ textareaRef, reviewInitValue }) {
    const [contents, setContents] = useState('');
    const [textLength, setTextLength] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { value }
        } = e;

        setContents(value);
        setTextLength(value.length);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = e;

        if (reviewInitValue === target.value) {
            setContents('');
            target.classList.add('on');
        }
    };

    useEffect(() => {
        setContents(reviewInitValue);
    }, []);

    return (
        <>
            <div>
                <textarea value={contents} rows={10} onChange={handleChange} onFocus={handleFocus} ref={textareaRef} />
                <span>{textLength} / 1,000</span>
            </div>
            <style jsx>{`
                div {
                    position: relative;
                    padding: 0 var(--side-padding);
                    textarea {
                        display: block;
                        width: 100%;
                        padding: 1.5rem 1rem 3rem;
                        border: 1px solid #e8e8e8;
                        color: #a2a2a2;
                        &.on {
                            color: #191919;
                        }
                    }
                    span {
                        position: absolute;
                        bottom: 1rem;
                        right: calc(var(--side-padding) + 1rem);
                    }
                }
            `}</style>
        </>
    );
}
