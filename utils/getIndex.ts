export default function getIndex(target: HTMLLIElement, lists: {}) {
    const nodes = Array.prototype.slice.call(lists);

    return nodes.indexOf(target);
}
