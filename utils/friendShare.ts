export default async function friendShare(text: string, url: string) {
    const unsecuredCopyToClipboard = (val) => {
        const textArea = document.createElement('textarea');

        textArea.value = val;
        document.body.prepend(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }

        document.body.removeChild(textArea);
    };

    if (navigator.share) {
        await navigator
            .share({
                title: '홍언니고기',
                url
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(url);
        } else {
            unsecuredCopyToClipboard(url);
        }
        alert(`${text} 복사되었습니다`);
    }
}
