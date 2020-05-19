import createId from '@/lib/idCreator';

const localStorageKeyName = 'tagList';
type Tag = {
    id: string;
    name: string;
}
type  TagsListModel = {
    data: Tag[];
    fetch: () => Tag[];
    save: () => void;
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    remove: (id: string) => boolean;
}
const tagsListModel: TagsListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));

    },
    create(name: string) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId();
        this.data.push({id: id.toString(), name: name});
        this.save();
        return 'success';
    },
    update(id: string, name: string) {
        const idList = this.data.map(i => i.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(i => i.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(i => i.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return false;
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    }

};
export {tagsListModel};