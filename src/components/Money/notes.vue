<template>
    <div>
        <label class="notes">
            <span class="name">备注</span>
            <input type="text" placeholder="在此输入">
        </label>
    </div>
</template>

<script lang='ts'>
    export default {
        name: 'notes'
    };
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