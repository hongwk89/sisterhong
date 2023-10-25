import CheckData from '@components/CheckData';
import InnerHtml from './InnerHtml';

export default function ProductInfo({ info }) {
    return (
        <CheckData data={info}>
            {info.state === 'success' && (
                <>
                    <div className="infoWrap">
                        <InnerHtml data={info.data.desc.description} />
                    </div>

                    <style jsx>{`
                        .infoWrap {
                            padding: 2rem var(--side-padding);
                        }
                    `}</style>
                </>
            )}
        </CheckData>
    );
}
