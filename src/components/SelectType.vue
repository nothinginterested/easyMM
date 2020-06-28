<template>
    <div class="wrapper">
        <span>{{title}}</span>
        <span>
            <Button type="-" :select="type" @click="ChangeTypeDay"> 支出</Button>
            <Button type="+" :select="type" @click="ChangeTypeDay">收入</Button>
        </span>
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
        @Prop() title: string | undefined;
        @Prop() type: string | undefined;


        ChangeTypeDay() {
            if (this.type !== '+') {
                this.$emit('update:type', '+');
            } else {
                this.$emit('update:type', '-');
            }


        }


    }
</script>

<style lang='scss' scoped>
    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;


        & > span:first-of-type {
        font-size: 16px;
        }
        &>button{
            font-size: 12px;
        }
    }
</style>
