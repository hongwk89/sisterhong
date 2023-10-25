import CustomImage from '@components/CustomImage';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar({ searchCalendar }) {
    const [date, setDate] = useState({ start: new Date(), end: new Date() });

    return (
        <>
            <div className="calendar">
                <label>
                    <DatePicker dateFormat={'yyyy-MM-dd'} selected={date.start} onChange={(date: Date) => setDate((prev) => ({ ...prev, start: date }))} />
                    <span className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/calendar.png`} alt="달력아이콘" width={30} height={30} />
                    </span>
                </label>
                <span>~</span>
                <label>
                    <DatePicker dateFormat={'yyyy-MM-dd'} selected={date.end} onChange={(date: Date) => setDate((prev) => ({ ...prev, end: date }))} />
                    <span className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/calendar.png`} alt="달력아이콘" width={30} height={30} />
                    </span>
                </label>
                <button type="button" onClick={() => searchCalendar(date)}>
                    조회
                </button>
            </div>
            <style jsx global>{`
                .calendar {
                    input {
                        width: 9rem;
                        height: 3rem;
                        padding: 0;
                        border-radius: 0;
                        font-size: 1.4rem;
                        font-family: 'roboto';
                        text-align: center;
                    }
                }
            `}</style>
            <style jsx>{`
                @mixin flexCenter {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .calendar {
                    margin-top: 1rem;
                    @include flexCenter;
                    > label {
                        @include flexCenter;
                        gap: 0.3rem;
                        > div {
                            @include flexCenter;
                        }
                        .image {
                            display: block;
                            width: 1.5rem;
                        }
                    }
                    button {
                        display: block;
                        height: 3rem;
                        width: 7rem;
                        background: #e8e8e8;
                    }
                }
            `}</style>
        </>
    );
}
