<template>

    <button @click="$emit('click',$event)" :class="{Income:select==='+'&&type==='+',Outlay:select==='-'&&type==='-'}">
        <slot></slot>
    </button>

</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class Button extends Vue {
        @Prop(String) select?: string;
        @Prop(String) type?: string;


    }
</script>

<style lang='scss' scoped>

    /*@import "~@/assets/reset.scss";*/
    button {

        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        outline: none;
        border-radius: 16px;
        margin-right: 8px;
        /*border: 1px solid #40B475;*/
        &.Income {
            background: #F0B739;
            color: white;
        }

        &.Outlay {

            background: #40B475;
            color: white;
        }


    }

</style>
