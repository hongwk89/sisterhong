export default function checkToggle(agreeArea: HTMLElement, agreeAll: HTMLInputElement, target: HTMLInputElement) {
    const inputs = agreeArea.querySelectorAll('input');
    const allAgree = target.id === agreeAll.id ? true : false;
    let agreeAllCheck = true;

    if (allAgree) {
        inputs.forEach((input) => {
            if (target.checked) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        });
    } else {
        inputs.forEach((input) => {
            if (!input.checked && input.id !== agreeAll.id) {
                agreeAllCheck = false;
            }
        });

        if (agreeAllCheck) {
            agreeAll.checked = true;
        } else {
            agreeAll.checked = false;
        }
    }
}
