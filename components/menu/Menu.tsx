import MenuList from './MenuList';

export default function Menu() {
    return (
        <>
            <div className="menu_header">
                <h2>전체카테고리</h2>
            </div>
            <div>
                <MenuList />
            </div>
            <style jsx>{`
                .menu_header {
                    position: relative;
                    margin: 3.5rem 0;
                    h2 {
                        font-size: 2.2rem;
                        font-weight: 700;
                        text-align: center;
                        line-height: 1.3;
                    }
                }
            `}</style>
        </>
    );
}
