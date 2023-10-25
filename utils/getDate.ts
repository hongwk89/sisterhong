export default function getDate(type: 'mypage' | 'popup', date: Date = null) {
    const today = date ? date : new Date();
    let timeString = '';

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    if (type === 'mypage') {
        timeString = year + '-' + month + '-' + day + ' 00:00:00';
    } else if (type === 'popup') {
        timeString = year + '-' + month + '-' + day + ' 23:59:59';
    } else {
        timeString = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes;
    }

    return timeString;
}
