<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" :placeholder="placeHolder" @input="onValueChanged($event.target.value)" :value="value"
            >
        </label>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop({default: ''}) value!: string;
        @Prop() fieldName!: string;
        @Prop() placeHolder?: string;
        content = this.value;

        @Watch('content')
        onValueChanged(value: string) {
            this.$emit('update:value', value);
        }

    }
</script>

<style lang='scss' scoped>
    .notes {
        font-size: 14px;
        background: white;
        display: flex;
        align-items: center;
        color: #576F96;

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
