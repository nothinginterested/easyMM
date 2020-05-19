<template>

    <div class="tags">
        <ul class="current">
            <li v-for="item in tags"
                :key="item.id"
                @click="activeClass(item)"
                :class="{selected:selectedTags.indexOf(item)>=0}"
            >{{item.name}}
            </li>

        </ul>
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import {TagHelper} from '@/mixins/TagHelper';

    @Component({
        components: {Button}
    })
    export default class extends TagHelper {
        selectedTags: string[] = [];

        get tags() {
            return this.$store.state.TagList;
        }

        created() {
            this.$store.commit('fetchTags');
        }

        activeClass(tag: string) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {

                this.selectedTags.splice(index, 1);
                console.log(this.selectedTags);
            } else {
                this.selectedTags.push(tag);
                this.$emit('update:value', this.selectedTags);

            }

        }




    }

</script>

<style lang='scss' scoped>

    .tags {

        font-size: 14px;
        padding: 16px;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                margin-top: 10px;
                $bg: #d9d9d9;
                $h: 24px;
                background: $bg;
                border-radius: $h/2;
                height: $h;
                line-height: $h;
                padding: 0 16px;
                margin-right: 8px;

                &.selected {
                    background: darken($bg, 70%);
                    color: whitesmoke;
                }
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;


            }
        }


    }
</style>