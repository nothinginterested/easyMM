<template>
    <div class="navWrapper">
        <div class="content">
            <slot></slot>

        </div>
        <Nav class="nav"></Nav>
    </div>

</template>

<script lang='ts'>
    export default {
        name: 'Layout'
    };
</script>

<style lang='scss' scoped>

    .navWrapper {
        border: 1px solid green;
        height: 100vh;
        display: flex;
        flex-direction: column;

        & > .content {
            border: 1px solid blue;
            flex-grow: 1;
            overflow: auto;
        }

        & > .nav {
        }

    }

</style>