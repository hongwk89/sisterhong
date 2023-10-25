export default function saleUnit(discount_type: '1' | '2', discount_ratio: string, price: string) {
    const discountType = parseInt(discount_type);
    const discountRatio = parseInt(discount_ratio);
    const priceNum = parseInt(price);
    let saleUnit: number;

    if (discountType) {
        switch (discountType) {
            case 1:
                saleUnit = discountRatio;
                break;
            case 2:
                saleUnit = Math.floor((discountRatio / priceNum) * 100);
                break;
            default:
                break;
        }

        return saleUnit;
    }
}
