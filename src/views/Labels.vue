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


        <section class="analysis-wrapper">
            <section>
                <SelectType title="每日对比" :type.sync="SelectTypeDay"></SelectType>

                <div class="day-wrapper" style="margin: 0 -24px;overflow-x: auto;background: white;color: #eee">
                    <v-chart :options="dayChartOptions" style="height:300px; flex: none" ref="day"></v-chart>

                </div>
            </section>
            <div style="border-bottom: 1px solid;margin: 24px 0;background: white;border-color: #eee"></div>

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
    import VEcharts from '@/components/V-Echarts.vue';
    import {getDaysInMonth} from '@/lib/date';
    import {barChart} from '@/lib/chart';
    import Button from '@/components/Button.vue';
    import SelectType from '@/components/SelectType.vue';

    type map = {
        '+': TRecordType;
        '-': TRecordType;
    }
    @Component({
        components: {
            SelectType,
            Button,
            VEcharts,
            SelectMonth
        }

    })

    export default class Labels extends TagHelper {
        SelectMonth = dayjs().month(dayjs(new Date()).month());
        MonthToggle = false;
        SelectTypeDay: '-' | '+' = '+';//每日对比 类型
        map: map = {
            '-': 'expense',
            '+': 'income'
        };


        get xDayData() {
            return getDaysInMonth(this.SelectMonth);
        }

        get yDayData() {
            return this.getYData(this.xDayData, this.RecordListDay, this.map[this.SelectTypeDay]);
        }

        get dayChartOptions() {
            return barChart(this.xDayData, this.yDayData, this.map[this.SelectTypeDay], '号');
        }

        getYData(days: number[], RecordListsDay: Result, type: TRecordType) {
            return days.map(item => {
                const record = RecordListsDay.find(r => dayjs(r.title).get('date') === item);
                if (record && type === 'income') {
                    return record.income;
                } else if (record && type === 'expense') {
                    return record.expense;
                } else {
                    return 0.00;
                }

            });

        }

        mounted() {
            console.log(this.$refs.day.dispatchAction);
            this.$refs.day.dispatchAction({
                    type: 'showTip',
                    dataIndex: 20
                }
            );
        }

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
    ::-webkit-scrollbar {
        display: none
    }

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


    .day-wrapper {
        width: 375px;
        height: 300px;
        padding: 0px;
        margin: 0px;
        border-width: 0px;
    }


    .analysis-wrapper {
        margin-top: 8px;
        padding: 24px;
        background: white;
    }
</style>
