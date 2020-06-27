<template>
    <div class="navWrapper" :class="classPrefix&&`${classPrefix}-wrapper`">
        <header class="header">
            <p class="title">记账本</p>
        </header>
        <section class="Wrapper" @click.stop="handleTypes" v-if="show">
            <section>
                <button class="types">
                    <span>全部类型</span>
                    <span class="xxx"></span>
                    <Icon icon="type"></Icon>
                </button>
            </section>
            <section class="date-wrapper">
                <button @click.stop="handleData" class="date">
                    <span>
                        {{Month}}

                    </span>

                </button>
                <span style="margin-right: 12px;">
                        总支出
                    ¥ {{ExpenseTotal}}

                    </span>

                <span>
                        总收入
                    ¥ {{IncomeTotal}}
                    </span>
            </section>
        </section>
        <div class="content" :class="classPrefix&&`${classPrefix}-content`">
            <slot></slot>

        </div>
        <Nav class="nav"></Nav>
    </div>

</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        @Prop(String) Month: string | undefined;
        @Prop({default: ''}) classPrefix: string | undefined;
        @Prop() show: boolean | undefined;
        @Prop() IncomeTotal: number | undefined;
        @Prop() ExpenseTotal: number | undefined;

        handleData() {
            this.$emit('handleDate');
        }

        handleTypes() {
            this.$emit('handleTypes');
        }

        get dateCurrent() {
            if (this.Month) {
                return this.Month;
            } else return '2020年06月';
        }


    }
</script>

<style lang='scss' scoped>

    .navWrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;

        & > .header {
            background: #40B475;
            padding: 52px 14px 16px;
            color: #edf5ed;

            > .title {
                text-align: center;
                font-size: 18px;
            }

        }

        & > .content {
            flex-grow: 1;
            overflow: auto;
        }


        & > .Wrapper {
            background: #40B475;
            display: inline-block;
            padding: 0 14px;
            color: #edf5ed;

            & > section > .types {
                background: #53BC82;
                border-radius: 4px;
                padding: 8px 8px;
                color: #edf5ed;

                & > .xxx {
                    margin: 0 16px;
                    border-right: 1px solid;
                }
            }

            & > section.date-wrapper {
                & > .date {
                    padding: 8px 16px;
                    background: none;
                    color: #edf5ed;
                    display: inline-flex;
                    align-items: center;


                }


            }
        }


    }

</style>
