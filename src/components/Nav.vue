<template>

    <nav>
        <router-link to="/money" class="item" active-class="selected">
                <Icon icon="money"></Icon>

            Money
        </router-link>
        ｜
        <router-link to="/labels" class="item" active-class="selected">
                <Icon icon="label"></Icon>
            标签
        </router-link>
        ｜
        <router-link to="/statistics" class="item" active-class="selected">
                <Icon icon="statistics"></Icon>
            统计
        </router-link>
    </nav>
</template>

<script lang='ts'>
    export default {
        name: 'Nav',

    };
</script>

<style lang='scss' scoped>
    .nav{
        display: flex;
        box-shadow: 0 0 3px rgba(0,0,0,0.9);
        font-size: 12px;
        >.item{
            padding: 2px 0;
            width: 33.333333%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            >.icon{
                width: 30px;
                height: 30px;
            }
        }
        > .item.selected{
            color:red;
        }


    }




</style>