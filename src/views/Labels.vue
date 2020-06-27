<template>

    <Layout>
        <section class="summary-wrapper">
            <button @click.stop="handleMonth">
                <span>{{Month}}</span>
                <span class="shuxian"></span>
                <Icon class="cross"></Icon>
            </button>
            <p class="expense">共支出</p>
            <p class="ExpenseTotal"><span>¥</span> <span class="money">{{ExpenseTotal}}</span></p>
            <p class="IncomeTotal">共收入 ¥ {{IncomeTotal}}</p>
        </section>
        <SelectMonth :value.sync="SelectMonth" v-if="MonthToggle" :MonthToggle.sync="MonthToggle">
        </SelectMonth>

    </Layout>
</template>

<script lang='ts'>
    import {Component} from 'vue-property-decorator';
    import {TagHelper} from '@/mixins/TagHelper';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';
    import SelectMonth from '@/components/SelectMonth.vue';

    @Component({
        components: {
            SelectMonth
        }
    })
    export default class Labels extends TagHelper {
        SelectMonth = dayjs().month(dayjs(new Date()).month());
        MonthToggle = false;

        handleMonth() {
            this.MonthToggle = true;
        }

        get Month() {
            return dayjs(this.SelectMonth).format('YYYY年MM月');
        }

        get IncomeTotal() {
            const xxx: number = this.RecordListDay.reduce((sum, b) => {
                return sum + b.income;
            }, 0);
            return xxx;
        }

        get ExpenseTotal() {
            const xxx: number = this.RecordListDay.reduce((sum, b) => {
                return sum + b.expense;
            }, 0);
            return xxx;
        }

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

        created() {
            this.$store.commit('fetchRecords');

        }
    }
</script>

<style lang='scss' scoped>
    .summary-wrapper {
        padding: 32px 0;
        text-align: center;
        background: white;

        & > button {
            padding: 8px 16px;
            background: #F7F7F7;
            color: #606266;

            & > .shuxian {
                border-right: 1px solid;
                border-color: #c0c4cc;

                margin: 0 8px;


            }

        }

        & > .expense {
            margin: 20px 0 4px;
            color: #40b475;

        }

        & > .ExpenseTotal {
            display: flex;
            align-items: flex-start;
            justify-content: center;

            & > span {
                font-weight: 500;
                font-size: 1.4em;
                color: #40b475;
            }

            & > .money {
                font-size: 2.2em;
                margin-left: 10px;
            }

        }

        & > .IncomeTotal {
            color: #909399;

        }
    }
</style>
