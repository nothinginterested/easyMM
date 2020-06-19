<template>

    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon icon="money"></Icon>

            <div>明细</div>

        </router-link>

        <router-link to="/labels" class="item" active-class="selected">
            <Icon icon="label"></Icon>
            <div>统计</div>
        </router-link>

        <router-link to="/statistics" class="item" active-class="selected">
            <Icon icon="statistics"></Icon>
            <div>设置</div>
        </router-link>
    </nav>
</template>

<script lang='ts'>
    export default {
        name: 'Nav',

    };
</script>

<style lang='scss' scoped>
    .nav {
        display: flex;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.9);
        font-size: 14px;
        padding: 4px 0;

        > .item {
            padding: 2px 0;
            width: 33.333333%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            >div{


            }
            > .icon {
                width: 30px;
                height: 30px;
                margin: 6px 0 4px 0;
            }
        }

        > .item.selected {
            color: #40B475;
        }


    }


</style>
