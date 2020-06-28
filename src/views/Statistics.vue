<template>
    <Layout>
        <div class="wrapper">
            <div>
                <span>把记账本推荐给朋友</span>
            </div>
            <div>
                <span>点个start支持哦</span>
            </div>
            <div>
                <span>后续展望 将使用Vue3与Vite进行重构</span>
            </div>

        </div>

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

    }
</script>

<style lang='scss' scoped>
 .wrapper{
     display: flex;
     flex-direction: column;
     justify-content: center;
     &>div{
         padding: 24px;
         background: white;
         display: flex;
         font-size: 16px;

         &>span{
             font-size: 1.2em;

         }
     }
     &>div:first-of-type{
         margin-bottom: 10px;
     }

 }

</style>
