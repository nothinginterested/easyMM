<template>
    <Layout class-prefix="xxx">


        <div class="numberPad">
            <div class="output">100</div>
            <div class="buttons">
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
                <button class="ok">ok</button>
                <button class="zero">0</button>
                <button>.</button>
            </div>
        </div>

        <ul class="types">
            <li class="selected">支出</li>
            <li>收入</li>

        </ul>

        <div>
            <label class="notes">
                <span class="name">备注</span>
                <input type="text" placeholder="在此输入">
            </label>
        </div>
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

    </Layout>


</template>

<script>

  export default {
    name: "Money",
  }
</script>

<style lang="scss">
    .xxx-wrapper {
        border: 1px solid red;
    }

    .xxx-content {
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;
    }

</style>

<style scoped lang="scss">
    @import '~@/assets/_var.scss';

    .xxx {
        display: flex;
        flex-direction: column-reverse;
        border: 1px solid red;
    }


    .numberPad {
        .output {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 18px 16px;
            text-align: right;
            box-shadow: inset 0 -5px 5px -5px fade_out(black, 0.3),
            inset 0 5px 5px -5px fade_out(black, 0.3);

        }

        .buttons {
            @extend %x;

            > button {
                width: 25%;
                height: 64px;
                background: transparent;
                border: none;

                &.ok {
                    height: 64*2px;
                    float: right;
                }

                &.zero {
                    width: 50%;
                }

                $bg: #f2f2f2;

                &:nth-child(1) {
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(5) {
                    background: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background: darken($bg, 4*2%);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    background: darken($bg, 4*3%);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    background: darken($bg, 4*4%);
                }

                &:nth-child(14) {
                    background: darken($bg, 4*5%);
                }

                &:nth-child(12) {
                    background: darken($bg, 4*6%);
                }
            }
        }


    }


    .types {
        font-size: 24px;
        background: #c4c4c4;
        justify-content: center;
        align-items: center;
        display: flex;

        > li {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 64px;
            width: 50%;
            position: relative;

            &.selected::after {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                content: '';
                height: 4px;
                background: #333333;
            }

        }
    }


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