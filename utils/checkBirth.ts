export default function checkBirth(bday1: string, bday2: string) {
    const regex1 = /(0[1-9]|1[0-2])/g;
    const regex2 = /(0[1-9]|[1-2][0-9]|3[0,1])/g;

    if (bday1 + bday2 !== '0000' && (!regex1.test(bday1) || !regex2.test(bday2))) {
        alert('생일 형식이 잘못되었습니다.');
        document.getElementsByName('birth1')[0].focus();
        return false;
    }

    return true;
}
