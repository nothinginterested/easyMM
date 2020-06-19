<template>
    <Card title="请选择类型" v-if="TypesToggle" @toggleOff="xxx">
        <section class="Wrapper">
            <section class="allTypes">
                全部类型
            </section>

            <p class="single">支出</p>
            <section class="incomeWrapper">
                <div v-for="(item,index) in  dataExpense" :key="index" class="income">
                    {{item.name}}

                </div>


            </section>

            <p class="single">
                收入
            </p>

            <section class="expenseWrapper">
                <div v-for="(item,index) in dataIncome" :key="index" class="expense">
                    {{item.name}}

                </div>
            </section>

        </section>


    </Card>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import Card from '@/components/Card.vue';

    @Component({
        components: {
            Card
        }
    })
    export default class extends Vue {
        @Prop() TypesToggle: boolean | undefined;
        @Prop() dataExpense: Tag[] | undefined;
        @Prop() dataIncome: Tag[] | undefined;

        xxx() {
            this.$emit('update:TypesToggle', false);
        }

    }
</script>

<style lang='scss' scoped>
    .Wrapper {
        border: 1px solid red;
        background-color: #FAFAFA;

        & > .single {
            padding: 8px 0 8px 8px;
            color: #909399;
        }
    }

    .incomeWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        & > .income {
            background-color: white;
            text-align: center;
            font-size: 1.1em;
            padding: 16px;
            width: 33.3%;
            border: 4px solid #FAFAFA;
            border-radius: 6px;
        }

    }

    .expenseWrapper {
        border: 1px solid red;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        & > .expense {


            background-color: white;
            text-align: center;
            font-size: 1.1em;
            padding: 16px;
            width: 33.3%;
            border: 4px solid #FAFAFA;
            border-radius: 6px;
        }

    }

    .allTypes {

        background-color: white;
        text-align: center;
        font-size: 1.1em;
        padding: 16px;
        width: 33.3%;
        border: 4px solid #FAFAFA;
        border-radius: 6px;

    }
</style>
