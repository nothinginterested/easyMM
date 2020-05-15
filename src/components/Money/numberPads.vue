<template>
    <div class="numberPad">
        <div class="output">{{output}}</div>
        <div class="buttons">
            <button @click="storeOutput">1</button>
            <button @click="storeOutput">2</button>
            <button @click="storeOutput">3</button>
            <button @click="deleteOutput">删除</button>
            <button @click="storeOutput">4</button>
            <button @click="storeOutput">5</button>
            <button @click="storeOutput">6</button>
            <button @click="clear">清空</button>
            <button @click="storeOutput">7</button>
            <button @click="storeOutput">8</button>
            <button @click="storeOutput">9</button>
            <button class="ok" @click="ok">ok</button>
            <button class="zero" @click="storeOutput">0</button>
            <button @click="storeOutput">.</button>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        output = '0';

        storeOutput(event: MouseEvent) {
            const button = event.target as HTMLButtonElement;
            const input = button.textContent as string;
            //第一步初始值为零
            if (this.output.length >= 16) {
                return;//最多十六位
            }

            if (this.output === '0') {
                if (input === '0') {
                    return;
                } else if ('123456789'.indexOf(input) >= 0) {
                    this.output = input;

                }
                if (input === '.') {
                    this.output += input;
                }
            } else if (this.output.indexOf('.') >= 0 && input === '.') {

                return;
            } else {
                this.output += input;
            }


        }

        clear() {
            this.output = '';
        }
        deleteOutput(){
            this.output=this.output.slice(0,-1)
        }
        ok(){
            console.log(`点击了ok按钮，还需要完善`);
        }
    }
</script>

<style lang='scss' scoped>
    @import "~@/assets/_var.scss";

    .numberPad {
        .output {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 18px 16px;
            text-align: right;
            box-shadow: inset 0 -5px 5px -5px fade_out(black, 0.3),
            inset 0 5px 5px -5px fade_out(black, 0.3);

            height: 72px;

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
</style>