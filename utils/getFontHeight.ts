export default function getfontHeight(fontFamily: string, fontSize: string) {
    const element = document.createElement('div');

    element.style.fontFamily = fontFamily;
    element.style.fontSize = fontSize;
    element.innerText = '홍언니고기';

    document.body.appendChild(element);

    const fontHeight = element.scrollHeight;

    document.body.removeChild(element);

    return fontHeight;
}
