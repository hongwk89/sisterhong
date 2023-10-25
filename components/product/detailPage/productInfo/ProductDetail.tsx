import BasicInfo from '../BasicInfo';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview/ProductReview';

export default function ProductDetail({ tab, data, info, setRvNum }) {
    return (
        <>
            <div className={`${tab === 0 ? 'on' : ''}`}>
                <ProductInfo info={info} />
            </div>
            <div className={`${tab === 1 ? 'on' : ''}`}>
                <ProductReview product_id={data.product.product_id} setRvNum={setRvNum} tab={tab} />
            </div>
            <div className={`${tab === 2 ? 'on' : ''}`}>
                <BasicInfo product_id={data.product.product_id} />
            </div>
            <style jsx>{`
                div {
                    display: none;
                    &.on {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}
