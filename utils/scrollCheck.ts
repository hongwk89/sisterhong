export default function scrollCheck(el: HTMLElement, callback: Function) {
    let onlyOne = true;
    const intersectionObserver = new IntersectionObserver(function (obj) {
        if (obj[0].intersectionRatio <= 0) {
            return;
        } else {
            if (onlyOne) {
                onlyOne = false;

                if (callback !== undefined) {
                    callback();
                }
            }
        }
    });

    intersectionObserver.observe(el);

    return intersectionObserver;
}
