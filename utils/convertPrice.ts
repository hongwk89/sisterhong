export default function convertPrice(price: number | string) {
    const pc = price.toString();

    if (pc.indexOf(',') != -1) {
        return pc.replaceAll(',', '');
    } else {
        return pc.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
