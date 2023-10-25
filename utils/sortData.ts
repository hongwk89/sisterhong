export default function sortData(data: [], type: string) {
    if (type === 'min' || type === 'max') {
        return [...data].sort((a, b) => {
            if (a['min_price'] > b['min_price']) {
                if (type === 'min') {
                    return 1;
                }
                return -1;
            }
            if (a['min_price'] < b['min_price']) {
                if (type === 'min') {
                    return -1;
                }
                return 1;
            }
            return 0;
        });
    } else {
        return [...data].sort((a, b) => {
            if (a[type] > b[type]) {
                return -1;
            }
            if (a[type] < b[type]) {
                return 1;
            }
            return 0;
        });
    }
}
