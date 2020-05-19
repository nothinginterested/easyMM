import Vue from 'vue';
import Vuex from 'vuex';
import {model} from '@/model/recordListmodel';


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
        saveRecord(state){
            window.localStorage.setItem('recordList', JSON.stringify(state.RecordList));
        }

    },
    actions: {},
    modules: {}
});

export default store;
