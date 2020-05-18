<template>
    <ul class="types">
        <li :class="select==='-'&&`selected`" @click="selectType('-')">支出</li>
        <li :class="select==='+'&&`selected`" @click="selectType('+')">收入</li>

    </ul>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';


    @Component
    export default class extends Vue {
        @Prop(String) select: string | undefined;

        // select = ;//'-'表示支出 '+'表示收入

        selectType(type: string) {
            this.$emit('update:select', type);
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