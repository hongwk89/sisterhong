import InfoArea from '@components/join/InfoArea';
import AgreeArea from '@components/join/AgreeArea';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '@hooks/useLogin';
import sendAxios from 'utils/sendAxios';
import getFormValues from 'utils/getFormValues';
import PageTitle from '@components/PageTitle';
import checkBirth from 'utils/checkBirth';

export default function Join({ query }) {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    const social = query.source;
    const joinFrom = useRef<HTMLFormElement>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validators = document.querySelectorAll('[data-check]');

        try {
            Array.from(validators).map((list: HTMLInputElement) => {
                if (list.dataset.check === 'false') {
                    throw { element: list, message: '입력하신 정보를 다시 확인해주세요. (' + list.dataset.name + ')' };
                }
            });
        } catch (err) {
            alert(err.message);
            if (err.element.dataset.name === '휴대전화') {
                document.getElementsByName('phone1')[0].focus();
            } else {
                err.element.focus();
            }
            return;
        }

        const data = getFormValues(joinFrom.current);

        const bday1 = data.birth1.padStart(2, '0');
        const bday2 = data.birth2.padStart(2, '0');
        if (!checkBirth(bday1, bday2)) return;

        const recommender = document.getElementsByName('recommender')[0];
        if (data.recommender !== '' && recommender.dataset.recommender === 'false') {
            alert('추천인코드를 확인해주세요.');
            recommender.focus();
            return;
        }

        try {
            const checks = document.querySelector('.agrees').querySelectorAll('input');

            Array.from(checks).map((list) => {
                const type = list.dataset.type;

                if (type === 'required') {
                    if (!list.checked) {
                        throw '필수약관에 동의해주세요.';
                    }
                }

                const name = list.getAttribute('name');

                if (name !== 'receive') {
                    if (list.checked) {
                        data[name] = 'T';
                    } else {
                        data[name] = 'F';
                    }
                }
            });
        } catch (err) {
            alert(err);
            return;
        }

        data.phone = data.phone1 + data.phone2 + data.phone3;

        if (bday1 + bday2 !== '0000' && (document.querySelector('#marketing') as HTMLInputElement).checked) {
            data.birthday = bday1 + bday2;
        }

        if (social) {
            data.user_id = query.user_id;
            data.sign_type = 'social';
            data.source = social;
            data.source_key = query.source_key;
        } else {
            data.sign_type = 'normal';
        }

        // 불필요한 데이터 삭제
        delete data.password2;
        for (let i = 1; i < 4; i++) {
            const phone = 'phone' + i;
            delete data[phone];
            if (i < 3) {
                const birth = 'birth' + i;
                delete data[birth];
            }
        }

        const config = { method: 'post', url: `${process.env.API_HOST}/auth/sign-up`, data };
        const success = async (res) => {
            setToken(res.token);

            const config = { method: 'post', data: res, url: `${process.env.DOMAIN}/api/cookieToken` };

            await sendAxios({ config });

            const return_url = router.query.returnUrl;

            if (return_url) {
                router.push('/join/joinComplete?returnUrl=' + return_url);
                return;
            }

            router.push('/join/joinComplete');
        };
        const fail = (err) => {
            alert(err.message);
            setSubmitted(false);
        };

        setSubmitted(true);
        await sendAxios({ config, resFunc: success, errFunc: fail });
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 회원가입" />
            <h1>
                <button type="button" onClick={router.back}>
                    <span className="hidden">뒤로가기</span>
                </button>
                {social ? '소셜회원가입' : '일반회원가입'}
            </h1>
            <form ref={joinFrom}>
                <InfoArea sns={social} />
            </form>
            <AgreeArea />
            <div className="buttonWrap">
                <button type="button" className="commonButton typeRed" onClick={handleSubmit} disabled={submitted}>
                    회원가입
                </button>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                h1 {
                    margin: 4rem var(--side-padding) 3rem;
                    position: relative;
                    font-size: 2.2rem;
                    font-weight: 700;
                    text-align: center;
                    button {
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        width: 2.2rem;
                        height: 2.2rem;
                        @include mixins.arrow(1.5rem, 0.2rem, 45deg, left, #a2a2a2);
                    }
                }
                .buttonWrap {
                    padding: 0 var(--side-padding-inner) 5rem;
                }
            `}</style>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const query = context.query;

    return {
        props: {
            query
        }
    };
};
