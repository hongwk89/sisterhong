import AgreeArea from '@components/join/AgreeArea';
import InfoArea from '@components/join/InfoArea';
import InfoModify from '@components/mypage/info/InfoModify';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import checkBirth from 'utils/checkBirth';
import sendAxios from 'utils/sendAxios';

interface modifyData {
    user_name: string;
    marketing: 'T' | 'F';
    sms: 'T' | 'F';
    mailing: 'T' | 'F';
    password?: string;
    birthday?: string;
}

const params = () => {
    const formData = { password: '', user_name: '', phone: '', birthday: '', marketing: '', sms: '', mailing: '', certification: '' };
    const user_name = (document.getElementsByName('user_name')[0] as HTMLInputElement).value;
    const phone = (document.getElementsByName('phone1')[0] as HTMLInputElement).value + (document.getElementsByName('phone2')[0] as HTMLInputElement).value + (document.getElementsByName('phone3')[0] as HTMLInputElement).value;
    const marketing = (document.getElementsByName('marketing')[0] as HTMLInputElement) ? ((document.getElementsByName('marketing')[0] as HTMLInputElement)?.checked ? 'T' : 'F') : 'T';
    const sms = (document.getElementsByName('sms')[0] as HTMLInputElement).checked ? 'T' : 'F';
    const mailing = (document.getElementsByName('mailing')[0] as HTMLInputElement).checked ? 'T' : 'F';
    const password = (document.getElementsByName('password')[0] as HTMLInputElement).value;
    const pw = document.getElementsByName('password2')[0];
    const password2 = (document.getElementsByName('password2')[0] as HTMLInputElement).value;
    const certification = (document.getElementsByName('certification')[0] as HTMLInputElement).value;
    const phoneAuthCheck = (document.getElementsByName('certification')[0] as HTMLInputElement).dataset.check;
    const bday1 = (document.getElementsByName('birth1')[0] as HTMLInputElement).value.padStart(2, '0');
    const bday2 = (document.getElementsByName('birth2')[0] as HTMLInputElement).value.padStart(2, '0');

    return { formData, user_name, phone, marketing, sms, mailing, password, pw, password2, certification, phoneAuthCheck, bday1, bday2 };
};

export default function AfterAuth({ data }) {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { formData, user_name, phone, marketing, sms, mailing, password, pw, password2, certification, phoneAuthCheck, bday1, bday2 } = params();

        if ((password !== '' || password2 !== '') && password !== password2) {
            alert('비밀번호를 다시 확인해주세요.');
            pw.focus();
            return;
        }

        if ((password !== '' || password2 !== '') && (pw.dataset.check === 'false' || phoneAuthCheck === 'false')) {
            alert('비밀번호 변경시에는 핸드폰인증이 필수입니다.');
            (document.getElementsByName('phone1')[0] as HTMLInputElement).focus();
            return;
        }

        if (user_name === '') {
            alert('이름을 입력해주세요');
            return;
        }

        if (phone !== data.phone && phoneAuthCheck === 'false') {
            alert('휴대전화 번호 변경시에는 인증이 필수입니다.');
            document.getElementsByName('phone1')[0].focus();
            return;
        }

        if (!checkBirth(bday1, bday2)) return;

        formData.user_name = user_name;

        if (phone !== data.phone || password2 !== '') {
            formData.password = password2;
            formData.phone = phone;
        }

        if (bday1 + bday2 !== '' && marketing === 'T') {
            formData.birthday = bday1 + bday2;
        }

        formData.marketing = marketing;
        formData.sms = sms;
        formData.mailing = mailing;
        formData.certification = certification;

        const config = { method: 'post', url: `${process.env.API_HOST}/auth/user-info/change`, data: formData };
        const success = () => {
            alert('수정되었습니다');
            router.push('/mypage');
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
            <div className="modifyArea">
                <InfoArea data={data} />
                <AgreeArea data={data} />
            </div>
            <div className="btnArea">
                <button className="commonButton typeRed" type="button" onClick={handleSubmit} disabled={submitted}>
                    수정
                </button>
            </div>
            <InfoModify />
            <style jsx>{`
                .btnArea {
                    padding: 0 var(--side-padding-inner);
                }
            `}</style>
        </>
    );
}
