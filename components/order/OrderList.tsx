import CartListOne from '@components/cart/CartListOne';

interface products {
    brand: string;
    name: string;
    product_id: number;
    image: {};
    options: { option: []; sauce: [] };
    price: number;
}

export default function OrderList({ data }) {
    return (
        <>
            <div className="wrap">
                <ul>
                    {data.map((data: products, idx: number) => (
                        <CartListOne key={idx} type="order" data={data} />
                    ))}
                </ul>
            </div>
            <style jsx>{``}</style>
        </>
    );
}
