<template>
    <Card title="请选择月份" @toggleOff="xxx">
        <div class="MonthWrapper">
            <p>{{year}}</p>
            <ul>
                <li v-for="(item,index) in thisYearMonths" :key="index" @click.stop="SelectMonth(item)"
                    :class="{selected:item.isSame(value,'month')}">
                    {{index+1}}月
                </li>
            </ul>
        </div>

        <slot></slot>
    </Card>

</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import Card from '@/components/Card.vue';
    import dayjs, {Dayjs} from 'dayjs';

    @Component({
        components: {Card}
    })
    export default class extends Vue {
        @Prop() value!: Dayjs;
        @Prop() MonthToggle!: boolean;
        year = dayjs().year();
        month = dayjs().month();
        thisYearMonths = new Array(this.month + 1).fill(1).map((a, index) => {
            return dayjs().month(index);
        });

        SelectMonth(value: Dayjs) {
            this.$emit('update:value', value);
        }

        xxx() {
            console.log('xxx');
            this.$emit('update:MonthToggle',false)
        }




    }
</script>

<style lang='scss' scoped>
    .MonthWrapper {
        padding: 0 16px;
        background: #FAFAFA;

        & > p {
            text-align: center;
            color: #909399;
            padding: 16px 0;

        }

        & > ul {
            display: flex;
            flex-wrap: wrap;

            & > li {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 6px;
                border: 4px solid #FAFAFA;
                width: 25%;
                background: white;
                color: #606266;
                font-size: 1.1em;
                padding: 16px;

                &.selected {
                    background: #40B475;
                }
            }
        }

    }
</style>
