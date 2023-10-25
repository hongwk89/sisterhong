export default function AddrAddBtn({ setPopOn2 }) {
    const handleAdd = () => {
        setPopOn2({ on: 'on', data: { shipping: null, user_name: '', phone: '', zipcode: '', address: '', detailed_address: '', default_address: '' } });
    };

    return (
        <>
            <button type="button" className="addBtn" onClick={handleAdd}>
                +추가
            </button>
            <style jsx>{`
                .addBtn {
                    display: block;
                    height: 2.5rem;
                    width: 4.4rem;
                    border: 1px solid var(--main-color);
                    border-radius: 0.5rem;
                    color: var(--main-color);
                    font-size: 1rem;
                }
            `}</style>
        </>
    );
}
