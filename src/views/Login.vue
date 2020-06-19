<template>
    <g-button @click="Login">hi</g-button>
</template>

<script lang='ts'>
    import Vue from 'vue';

    type Login = {
        user_name: string;
        user_password: string;
    }
    export default class extends Vue {

        Login() {
            console.log(Vue.axios);

            console.log('hi');

        }


    }


</script>

<style lang='scss' scoped>

</style>
