<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" :placeholder="placeHolder" v-model="content"
            >
        </label>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class extends Vue {

        @Prop() fieldName!: string;
        @Prop() placeHolder?: string;
        content = '';

        @Watch('content')
        onValueChanged(value: string) {
            this.$emit('update:value', value);
        }

    }
</script>

<style lang='scss' scoped>
    .notes {
        font-size: 14px;
        background: #f5f5f5;
        display: flex;
        align-items: center;

        > .name {
            padding: 0 16px;

        }

        input {
            background: transparent;
            border: none;
            height: 64px;
            flex-grow: 1;

        }


    }
</style>