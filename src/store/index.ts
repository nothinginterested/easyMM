import Vue from 'vue';
import Vuex from 'vuex';
import {model} from '@/model/recordListmodel';
import createId from '@/lib/idCreator';
import router from '@/router';
import {ALL_CATEGORIES} from '@/lib/data';
import dayjs from 'dayjs';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        RecordList: [],
        TagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        fetchRecords(state) {
            state.RecordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
            state.RecordList.forEach(item => {
                item.id = dayjs(item.date).valueOf();
            });

        },
        createRecord(state, record: RecordItem) {
            console.log(record);
            const record2: RecordItem = model.clone(record);

            record2.date = new Date().toISOString();
            record2.id = dayjs(record2.date).valueOf();
            state.RecordList.push(record2);

            store.commit('saveRecord');

        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.RecordList));
        },
        fetchTags(state) {
            state.TagList = ALL_CATEGORIES;


        },
        createTag(state, name: string) {
            const names = state.TagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
            } else {
                const id = createId();
                state.TagList.push({id: id, name: name});
                store.commit('saveTag');
            }

        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.TagList));
        },
        setCurrentTag(state, id: number) {
            state.currentTag = state.TagList.filter(item => item.id === id)[0];
        },
        updateTag(state, payload: { id: number; name: string }) {
            const {id, name} = payload;
            const idList = state.TagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.TagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.TagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTag');
                }
            }
        },
        removeTag(state, id: number) {
            let index = -1;
            for (let i = 0; i < state.TagList.length; i++) {
                if (state.TagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.TagList.splice(index, 1);
                store.commit('saveTag');
                router.back();
            }


        }


    },
    actions: {},
    modules: {}
});

export default store;
