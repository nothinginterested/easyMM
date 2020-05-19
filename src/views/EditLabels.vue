<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" icon="left"></Icon>
            <span>编辑标签</span>
            <span class="rightIcon"></span>

        </div>
        <div class="form-wrapper">
            <FormItem :value="tag" field-name="标签名" :place-holder="tag.name"
                      @update:value="update"/>
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

    @Component({
        components: {Button, FormItem: FormItem}
    })

    export default class EditLabels extends Vue {
        tag?: { id: number; name: string } = undefined;

        created() {
            const id = this.$route.params.id;
            this.$store.commit('fetchTags');
            this.$store.commit('setCurrentTag', parseFloat(id));
            this.tag = this.$store.state.currentTag;
            console.log(this.tag);

        }

        update(name: string) {
            if (this.tag) {
                this.$store.commit('updateTag', {id: this.tag.id, name});
            }

        }

        removeTag() {
            if (this.tag) {
                this.$store.commit('removeTag',this.tag.id)
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