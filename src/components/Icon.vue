<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script lang='ts'>
    export default {
        name: 'Icon',
        props: {
            icon: {
                type: String
            }
        }
    };
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