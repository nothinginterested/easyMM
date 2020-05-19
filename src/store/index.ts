import Vue from 'vue';
import Vuex from 'vuex';
import {model} from '@/model/recordListmodel';
import createId from '@/lib/idCreator';


Vue.use(Vuex);
type RootState = {
    RecordList: RecordItem[];
    TagList: Tag[];
}
const store = new Vuex.Store({
    state: {
        RecordList: [],
        TagList: []
    } as RootState,
    mutations: {
        fetchRecords(state) {
            state.RecordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            const record2: RecordItem = model.clone(record);
            state.RecordList.push(record2);

            store.commit('saveRecord');

        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.RecordList));
        },
        fetchTags(state) {
            state.TagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');

        },
        createTag(state, name: string) {
            const names = state.TagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
            }else {
                const id = createId();
                state.TagList.push({id: id, name: name});
                store.commit('saveTag');
            }

        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.TagList));
        }

    },
    actions: {},
    modules: {}
});

export default store;
