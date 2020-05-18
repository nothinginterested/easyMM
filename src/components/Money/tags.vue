<template>

    <div class="tags">
        <ul class="current">
            <li v-for="item in tags"
                :key="item"
                @click="activeClass(item)"
                :class="{selected:selectedTags.indexOf(item)>=0}"
             >{{item}}
            </li>

        </ul>
        <div class="new">
            <button @click.native="createTag" >新增标签</button>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    @Component({
        components: {Button}
    })
    export default class extends Vue {
        @Prop() readonly    tags: string[] | undefined;
        selectedTags: string[] = [];

        mounted() {
            console.log(this.tags);
        }

        activeClass(tag: string) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {

                this.selectedTags.splice(index, 1);
                console.log(this.selectedTags);
            } else {
                this.selectedTags.push(tag);
                this.$emit('update:value',this.selectedTags)

            }

        }

        createTag() {
            const name = window.prompt('请输入标签名字');
            if (name === '') {
                window.alert('标签名字不能为空哦');
            } else if (this.tags) {
                this.$emit('update:tags', [...this.tags, name]);

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