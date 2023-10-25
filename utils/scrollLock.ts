export default function scrollLock(lock: Boolean) {
    const html = document.querySelector('html');

    if (lock) {
        html.style.cssText = 'overflow:hidden;';
    } else {
        html.style.cssText = 'overflow:auto';
    }
}
