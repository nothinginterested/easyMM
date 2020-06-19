<template>
    <Layout class-prefix="xxx" @handleDate="changeMonthToggle" @handleTypes="changeTypesToggle" :Month="Month"
            style="background: #EDEDED">

        <div class="Record" @click="open">

            <Icon icon="jilu" color="normal" class="icon"></Icon>

        </div>
        <Record v-if="RecordToggle" :RecordToggle.sync="RecordToggle" :data-income="dataIncome"
                :data-expense="dataExpense"></Record>

        <SelectMonth :value.sync="SelectMonth" v-if="MonthToggle" :MonthToggle.sync="MonthToggle">
        </SelectMonth>
        <Types :TypesToggle.sync="TypesToggle" :data-expense="dataExpense"
               :data-income="dataIncome"

        ></Types>
        <ul style="flex-grow: 1;padding: 8px;overflow: auto">
            <li v-for="(group,index) in RecordListDay" :key="index" class="day-wrapper">
                <header class="headerDay">
                    <section>
                        <span> {{group.title }}</span>
                        <span>  {{WeekList[ group.day]}}</span>
                    </section>
                    <section class="income-expense-wrapper">
                        <span class="expense">支</span>
                        <span>
                        {{group.expense}}
                    </span>
                        <span class="income">收</span>
                        <span>{{group.income}}</span>
                    </section>
                </header>
                <ul>
                    <router-link v-for="(item,index) in group.item" :key="index" class="item-wrapper"
                                 :to="`/user/${item.id}`">
                        <span>
                                                    <Icon icon=""></Icon>
                        </span>
                        <div class="record-content">
                            <div>{{item.tags[0].name}}</div>
                            <div class="record-content-details">
                                <span>{{getTime(item)}}</span>
                            </div>
                        </div>

                        <div>
                            {{item.type==='+'?'+'+item.amount:'-'+item.amount}}

                        </div>
                    </router-link>
                </ul>


            </li>
        </ul>


    </Layout>


</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPads from '@/components/Money/numberPads.vue';
    import Types from '@/components/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/tags.vue';
    import {Component} from 'vue-property-decorator';
    import Record from '@/components/Record.vue';
    import Card from '@/components/Card.vue';
    import {ALL_CATEGORIES, DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES} from '@/lib/data';
    import SelectMonth from '@/components/SelectMonth.vue';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';


    @Component({
        components: {
            SelectMonth,
            Record,
            Card,
            Types, FormItem, Tags, NumberPads
        }
    })
    export default class extends Vue {
        RecordToggle = false; //这是控制记账页面的toggle
        TypesToggle = false; //这是类型控制
        MonthToggle = false; //这是月份控制
        dataIncome = DEFAULT_INCOME_CATEGORIES;
        dataExpense = DEFAULT_EXPENSE_CATEGORIES;
        SelectMonth = dayjs().month(dayjs(new Date()).month());
        WeekList = {
            Sunday: '星期日',
            Monday: '星期一',
            Tuesday: '星期二',
            Wednesday: '星期三',
            Thursday: '星期四',
            Friday: '星期五',
            Saturday: '星期六'

        };

        get RecordList(): RecordItem[] {
            return this.$store.state.RecordList;
        }


        get RecordListMonth(): RecordItem[] {   //过滤所选月份
            return this.RecordList.filter(item => {
                return this.SelectMonth.month() === dayjs(item.date).month();

            }).sort((a, b) => {
                return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
            });
        }

        get RecordListDay() {  //对每个月进行排序
            const newList = clone(this.RecordListMonth);

            if (newList.length > 0) {
                const result: Result = [{
                    day: dayjs(newList[0].date).format('dddd'),
                    title: dayjs(newList[0].date).format('MM-DD'),
                    item: [newList[0]],
                    expense: 0,
                    income: 0

                }];
                for (let i = 1; i < newList.length; i++) {
                    const current = newList[i];
                    const last = result[result.length - 1];
                    if (dayjs(current.date).isSame(dayjs(last.item[0].date), 'day')) {
                        last.item.push(current);
                    } else {
                        result.push({
                            day: dayjs(current.date).format('dddd'),
                            title: dayjs(current.date).format('MM-DD'),
                            item: [current],
                            income: 0,
                            expense: 0
                        });
                    }
                }
                result.map(group => {
                    group.income = group.item.reduce((sum, b) => {
                        return b.type === '+' ? sum + b.amount : sum;
                    }, 0);
                });
                result.map(group => {
                    group.expense = group.item.reduce((sum, b) => {
                        return b.type === '-' ? sum + b.amount : sum;
                    }, 0);
                });
                return result;

            } else {
                return [];
            }

        }

        changeMonthToggle() {
            this.MonthToggle = true;
        }

        get Month() {
            return dayjs(this.SelectMonth).format('YYYY年MM月');
        }

        created() {
            this.$store.commit('fetchRecords');
            console.log(dayjs(this.RecordList[0].date).month());

        }

        open() {
            this.RecordToggle = true;
            console.log(this);
        }

        changeTypesToggle() {
            this.TypesToggle = true;
        }

        getTime(value: RecordItem) {
            return dayjs(value.date).format('HH:MM');
        }

        record: RecordItem = {
            notes: '',
            tags: [],
            type: '-',
            amount: 0,
        };

        onUpdateNotes(value: string) {
            this.record.notes = value;

        }

        onUpdateTags(value: Tag[]) {
            this.record.tags = value;
        }

        saveRecord() {
            this.$store.commit('createRecord', this.record);
            this.record.notes = '';
            this.record.amount = 0;


        }


    }

</script>

<style lang="scss">
    .xxx-wrapper {
    }

    .xxx-content {
        display: flex;
    }

</style>

<style scoped lang="scss">
    @import '~@/assets/_var.scss';


    .Record {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 128px;
        right: 32px;
        border-radius: 50%;
        box-shadow: 0 2px 24px -6px #606266;

        > .icon {
            position: relative;
            width: 30px;
            height: 30px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

    }

    .Wrapper {
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

    .day-wrapper {
        border-radius: 8px;
        background: white;
        color: #303133;
        margin-bottom: 8px;
        overflow: hidden;

        & > .headerDay {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 18px;
            background: #FBFBFB;

            & > .income-expense-wrapper {
                display: flex;
                align-items: center;
                color: #606266;

                & > .income {
                    margin-left: 16px;
                    width: 1.5em;
                    height: 1.5em;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #F4F4F4;
                    border-radius: 4px;
                }

                & > .expense {
                    width: 1.5em;
                    height: 1.5em;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #F4F4F4;
                    border-radius: 4px;

                }
            }
        }
    }

    .item-wrapper {
        padding: 24px 18px;
        color: #606266;
        text-decoration: none;
        display: flex;

        & > span:first-of-type {
            padding: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #40B475;
            border-radius: 50%;
        }

        & > .record-content {
            flex-grow: 1;
            padding: 0 16px;

            & > .record-content-details {
                color: #C0C4CC;
            }
        }
    }

</style>
