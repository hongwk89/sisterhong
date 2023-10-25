import CustomImage from '@components/CustomImage';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import sendAxios from 'utils/sendAxios';

export default function CheckInput({ name, text = '', readOnly = false, func = null, val = '' }) {
    const router = useRouter();
    const code = router.query.code || '';
    const initVal = name === 'recommender' ? code : val;
    const [value, setValue] = useState(initVal);
    const [checkValue, setCheckValue] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckValue(false);
        setValue(e.target.value);
    };

    const checkCode = async () => {
        setLoading(true);

        const config = { method: 'post', url: `${process.env.API_HOST}/auth/recommender`, data: { recommender: value } };
        const fail = () => {
            alert('추천인코드가 확인되지않습니다. 다시 확인하여주세요.');
            setCheckValue(false);
        };

        await sendAxios({ config, resFunc: () => setCheckValue(true), errFunc: fail });
        setLoading(false);
    };

    const checkEmail = async () => {
        setLoading(true);

        const config = { method: 'post', url: `${process.env.API_HOST}/auth/sign-check-id`, data: { user_id: value } };
        const fail = (err) => {
            alert(err.message);
            setCheckValue(false);
        };

        await sendAxios({ config, resFunc: () => setCheckValue(true), errFunc: fail });
        setLoading(false);
    };

    const handleCheck = (name: string) => {
        if (name === 'recommender') {
            checkCode();
        } else {
            checkEmail();
        }
    };

    useEffect(() => {
        if (name === 'recommender' && code) {
            checkCode();
        }
        if (name === 'user_id' && val) {
            setCheckValue(true);
        }
    }, []);

    return (
        <>
            <div className="btnInput">
                {name === 'recommender' ? (
                    <input type="text" name={name} placeholder={text} value={value} onChange={handleChange} {...func} data-name="추천인코드" data-recommender={checkValue} ref={inputRef} />
                ) : (
                    <input type="text" name={name} placeholder={text} value={value} onChange={handleChange} readOnly={readOnly} {...func} data-check={checkValue} data-name="아이디" ref={inputRef} />
                )}

                <button type="button" onClick={() => handleCheck(name)} disabled={loading}>
                    {checkValue ? (
                        <span className="image">
                            <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/check.png`} width={43} height={30} alt="체크" />
                        </span>
                    ) : (
                        <span>확인</span>
                    )}
                </button>
            </div>
            <style jsx>{`
                .btnInput {
                    display: flex;
                    input {
                        border-radius: 0.5rem 0 0 0.5rem;
                        padding-right: 0;
                        &:read-only + button {
                            border: none;
                        }
                    }
                    button {
                        display: block;
                        width: 8.5rem;
                        background: #f8f8fa;
                        border-radius: 0 0.5rem 0.5rem 0;
                        border: 1px solid #a2a2a2;
                        border-left: none;

                        span {
                            display: block;
                            margin: 0 auto;
                            font-size: 1.8rem;
                            font-weight: 500;
                            &.image {
                                width: 2rem;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
