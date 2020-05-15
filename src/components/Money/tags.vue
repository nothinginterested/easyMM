<template>

    <div class="tags">
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
        <div class="new">
            <button>新增标签</button>
        </div>
    </div>
</template>

<script lang='ts'>
    export default {
        name: 'tags'
    };
</script>

<style lang='scss' scoped>

    .tags {

        font-size: 14px;
        padding: 16px;

        > .current {
            display: flex;

            > li {
                $h: 24px;
                background: #d9d9d9;
                border-radius: $h/2;
                height: $h;
                line-height: $h;
                padding: 0 16px;
                margin-right: 8px;
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }


    }
</style>