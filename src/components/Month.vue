<template>
    <button @click.stop="handleData" class="date">
                    <span>
                        {{Month}}

                    </span>

    </button>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop(String) Month: string | undefined;

        handleData() {
            this.$emit('handleDate');
        }

    }
</script>

<style lang='scss' scoped>
    .date {
        padding: 8px 16px;
        background: none;
        color: #edf5ed;
        display: inline-flex;
        align-items: center;


    }

</style>
