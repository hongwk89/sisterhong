import { useState } from 'react';
import ContactEmpty from './ContactEmpty';
import ContactListOne from './ContactListOne';
import Pager from '../../Pager';

interface contact {
    idx: number;
    property: string;
    property_value: string;
    title: string;
    content: string;
    comment: string;
    created_at: string;
    images: [];
}

export default function ContactList({ data }) {
    const [datas, setDatas] = useState({ pagination: data.pagination, data: [data.list.ask], curPage: 1, loadedPages: [1] });

    return (
        <>
            {datas.data[0].length === 0 ? (
                <ContactEmpty />
            ) : (
                <>
                    <div>
                        <ul>
                            {datas.data[datas.curPage - 1].map((list: contact, idx: number) => (
                                <ContactListOne key={idx} data={list} />
                            ))}
                        </ul>
                    </div>
                    <Pager datas={datas} setDatas={setDatas} type="contact" />
                    <style jsx>{`
                        div {
                            padding: 0 var(--side-padding);
                        }
                    `}</style>
                </>
            )}
        </>
    );
}
