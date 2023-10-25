import MenuSearch from './MenuSearch';

export default function Search() {
    return (
        <>
            <div className="menu_header">
                <h2>검색</h2>
            </div>
            <div className="content">
                <MenuSearch />
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
                .content {
                    padding: 0 var(--side-padding-inner);
                }
            `}</style>
        </>
    );
}
