<template>
    <Layout>

        <Tabs :data-source="dataSource" :select.sync="type" class-prefix="type"></Tabs>
        <Tabs  />
    </Layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';

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
    }
</script>

<style lang='scss' scoped>
    ::v-deep {
        .type-item{
            background: #c4c4c4;
            &.selected{
                background: white;
                &::after{
                    display: none;
                }
            }
        }

    }


</style>
