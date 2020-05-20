<template>
    <ul class="types">
        <li v-for="item in dataSource" :key="item.value"
            :class="{[classPrefix+'-item']:classPrefix,selected:item.value===select}"
            @click="selectType(item)">{{item.text}}
        </li>

    </ul>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    type dataSourceItem = {
        text: string;
        value: string;
    }

    @Component
    export default class Tabs extends Vue {
        @Prop(String) select!: string ;
        @Prop({type: Array}) dataSource!: dataSourceItem[];
        @Prop(String) classPrefix?: string;


        // select = ;//'-'表示支出 '+'表示收入

        selectType(type: dataSourceItem) {
            this.$emit('update:select', type.value);
        }
    }
</script>

<style lang='scss' scoped>
    .types {
        font-size: 24px;
        background: #c4c4c4;
        justify-content: center;
        align-items: center;
        display: flex;

        > li {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 64px;
            width: 50%;
            position: relative;

            &.selected::after {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                content: '';
                height: 4px;
                background: #333333;
            }

        }
    }
</style>
