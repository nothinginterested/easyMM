<template>
    <Layout>

        <Tabs :data-source="dataSource" :select.sync="type" class-prefix="type"></Tabs>
        <ol>
            <li v-for="(group,index) in GroupList" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li v-for="item in group.item" :key="item.id" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>¥</span>
                    </li>
                </ol>
            </li>
        </ol>

    </Layout>

</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import clone from '@/lib/clone';
    import dayjs from 'dayjs';

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        dataSource = [{
            text: '收入',
            value: '+'
        }, {
            text: '支出',
            value: '-'

        }];


        type = '-';

        tagString(x: Tag[]) {
            let string='';
            if(x.length===0){
                return '无'
            }else {
                x.forEach(x=>{
                    string=string+' '+x.name

                })
            }
            console.log(string);
            return  string
        }


        get RecordList() {
            return (this.$store.state as RootState).RecordList;
        }

        created() {
            this.$store.commit('fetchRecords');
        }

        get GroupList() {
            const {RecordList} = this;
            const newList = clone(RecordList).filter(a => a.type === this.type)
                .sort((a, b) => {
                    return (dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
                });
            const result: Result = [{
                title: dayjs(newList[0].date).format('YYYY-MM-DD'),
                item: [newList[0]]
            }];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(current.date).isSame(dayjs(last.title), 'day')) {
                    last.item.push(current);
                } else {
                    result.push({title: dayjs(current.date).format('YYYY-MM--DD'), item: [current]});
                }
            }


            return result;


        }
    }
</script>

<style lang='scss' scoped>
    ::v-deep {
        .type-item {
            background: #c4c4c4;

            &.selected {
                background: white;

                &::after {
                    display: none;
                }
            }
        }

    }

    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .title {
        @extend %item;
    }

    .record {
        background: white;
        @extend %item;
    }

    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }


</style>
