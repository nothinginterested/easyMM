<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" icon="left"></Icon>
            <span>编辑标签</span>
            <span class="rightIcon"></span>

        </div>
        <div class="form-wrapper">
            <FormItem :value="tag" field-name="标签名" :place-holder="tag.name"
                      @update:value="updateTag"/>
        </div>
        <div class="button-wrapper">
            <Button @click="removeTag">删除标签</Button>

        </div>
    </layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';
    import {tagsListModel} from '@/model/tagsListModel';

    @Component({
        components: {Button, FormItem: FormItem}
    })

    export default class EditLabels extends Vue {
        tag?: { id: string; name: string } = undefined;

        created() {
            const id = this.$route.params.id;
            tagsListModel.fetch();
            const tags = tagsListModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if (tag) {
                this.tag = tag;
            }
        }

        updateTag(name: string) {
            if (this.tag) {
                tagsListModel.update(this.tag.id, name);

            }
        }

        removeTag() {
            if (this.tag) {
                tagsListModel.remove(this.tag.id);
                this.$router.back()
            }
        }

    }
</script>

<style lang='scss' scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        padding: 12px 16px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .title {
        }

        > .leftIcon {
            width: 24px;
            height: 24px;
        }

        > .rightIcon {
            width: 24px;
            height: 24px;
        }
    }

    .form-wrapper {
        background: white;
        margin-top: 8px;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }

</style>