export default function getFormValues(targetForm) {
    const formData = new FormData(targetForm);
    let formValues = {};

    for (const [key, value] of formData.entries()) {
        if (key !== 'agreeAll' && key !== 'receive') {
            formValues[key] = value;
        }
    }

    return formValues;
}
