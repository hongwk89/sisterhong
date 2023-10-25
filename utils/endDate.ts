interface endDate {
    usable_end_date: string;
}

export default function endDate(list: endDate, time: string) {
    const leftTime = Math.floor((new Date(list.usable_end_date).getTime() - new Date(time).getTime()) / (60 * 60 * 1000));
    const end_date_arr = list.usable_end_date.split(/(\s|\-)/g);
    const end_date = end_date_arr[0] + '년 ' + end_date_arr[2] + '월 ' + end_date_arr[4] + '일';

    return { leftTime, end_date };
}
