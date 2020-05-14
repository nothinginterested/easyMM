<template>
    <Layout>
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="new"></div>
        </div>
        <div class="notes">
            <label for="content">
                <span>备注</span>
                <input type="text">
            </label>
        </div>
        <div class="types">
            <div>支出</div>
            <div>收入</div>

        </div>
        <div class="numberPad">
            <div class="output">100</div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>删除</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>清空</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>ok</button>
            <button>0</button>
            <button>.</button>
        </div>

    </Layout>


</template>

<script>

  export default {
    name: "Money",
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/_var.scss';

    .tags{
        >.current{
            display: flex;
            >li{

            }
        }

    }

</style>