export default function getDateDiff(d1: Date, d2: Date, type: string) {
    const diffDate = d2.getTime() - d1.getTime();

    if (diffDate < 0) return false;

    const addZero = (num) => {
        if (num < 10) return '0' + num;
        else return num;
    };

    if (type === 'hms') {
        let second = Math.floor((diffDate / 1000) % 60);
        let minute = Math.floor((diffDate / (1000 * 60)) % 60);
        let hour = Math.floor(diffDate / (1000 * 60 * 60));

        return addZero(hour) + ' : ' + addZero(minute) + ' : ' + addZero(second);
    } else if (type === 's') {
        return addZero(Math.floor(diffDate / 1000));
    } else if (type === 'd') {
        return Math.floor(diffDate / (1000 * 60));
    }
}
