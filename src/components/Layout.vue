<template>
    <div class="navWrapper" :class="classPrefix&&`${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix&&`${classPrefix}-content`">
            <slot></slot>

        </div>
        <Nav class="nav"></Nav>
    </div>

</template>

<script lang='ts'>
    export default {
        name: 'Layout',
        props: ['classPrefix']
    };
</script>

<style lang='scss' scoped>

    .navWrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;

        & > .content {
            flex-grow: 1;
            overflow: auto;
        }

        & > .nav {
        }

    }

</style>