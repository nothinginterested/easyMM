<template>
    <svg class="icon " aria-hidden="true" :class="`${color}-wrapper`" @click="test">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop() icon?: string;
        @Prop() color?: string;
        test(){
            this.$emit('click')
        }

    }
</script>

<style lang='scss' scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
