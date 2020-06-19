<template>
    <div class="numberPad">
        <!--        <div class="output">{{output}}</div>-->
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
            <button class="ok " @click="ok" :class="{Income:select==='+',Outlay:select==='-'}">ok</button>
            <button class="zero" @click="storeOutput">0</button>
            <button @click="storeOutput">.</button>
        </div>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop(String) amount!: string;
        @Prop(String) select!: string;
        output = this.amount;

        mounted() {
            console.log(this.output);
        }

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
                    this.$emit('update:amount', (this.output));


                }
                if (input === '.') {
                    this.output += input;
                    this.$emit('update:amount', (this.output));

                }
            } else if (this.output.indexOf('.') >= 0 && input === '.') {

                return;
            } else {
                this.output += input;
                this.$emit('update:amount', (this.output));

            }


        }

        clear() {
            this.output = '';
        }

        deleteOutput() {
            this.output = this.output.slice(0, -1);
            this.$emit('update:amount', (this.output));

        }

        ok() {
            this.$emit('submit');
            this.clear();


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
            background: #FAFAFA;

            > button {
                width: 25%;
                height: 64px;
                background: white;
                border-radius: 4px;
                font-size: 1.3em;
                border: 4px solid #FAFAFA;

                &.ok {
                    height: 64*2px;
                    float: right;
                    background: #40B475;
                }
                &.ok.Income{
                    background: #F0B739;
                }

                &.zero {
                    width: 50%;
                }


            }
        }


    }
</style>
