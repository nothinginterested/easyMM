<template>

    <Layout>
        <div class="tags">
            <router-link v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`"
            class="tag">{{tag.name}}</router-link>


        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="createTag">新建标签</Button>
        </div>


    </Layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {tagsListModel} from '@/model/tagsListModel';

    tagsListModel.fetch();
    @Component
    export default class Labels extends Vue {
        tags = tagsListModel.data;

        createTag() {
            const name = window.prompt('请输入标签名') as string;
            if (name) {
                const message=tagsListModel.create(name);
                if(message==='duplicated'){
                    window.alert('请勿输入重复的标签')
                }
            }
        }

    }
</script>

<style lang='scss' scoped>
    .tags {
        background: whitesmoke;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;

            svg {
                width: 18px;
                height: 18px;
                color: #666;
                margin-right: 16px;
            }
        }
    }

    .createTag-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;

        > .createTag {
            background: #767676;
            color: white;
            border-radius: 4px;
            border: none;
            height: 40px;
            padding: 0 16px;
        }
    }
</style>