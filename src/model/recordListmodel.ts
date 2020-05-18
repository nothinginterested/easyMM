const localStorageKeyName = 'recordList';

const model = {
    fetch() {
        const x = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return x;
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));

    },
    clone(data: RecordItem | RecordItem[]) {
        const record2: RecordItem = JSON.parse(JSON.stringify(data));
        return record2;
    }
};
export {model};