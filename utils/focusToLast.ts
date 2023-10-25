export default function focusToLast(target: HTMLInputElement) {
    const length = target.value.length;

    target.focus();
    setTimeout(() => target.setSelectionRange(length, length), 1);
}
