<template>
    <Card title="" @toggleOff="handleClick">
        <section class="types">
            <Button :select="record.type" @click="setType" type="-">支出</Button>
            <Button :select="record.type" @click="setType" type="+">收入</Button>
        </section>
        <section class="output">
            <span>¥</span>
            <div>{{record.amountToString}}</div>
        </section>
        <ul class="tagList" v-if="record.type==='+'">
            <li v-for="(item,index) in dataIncome" :key="index" class="tag-item" @click="handleTag(item)" :class="{selectedIncome: record.tags.indexOf(item)>=0}
 ">
                <span class="tag-icon">
                    <Icon icon=""></Icon>
                </span>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <ul class="tagList" v-else>
            <li v-for="(item,index) in dataExpense" :key="index" class="tag-item" @click="handleTag(item)" :class="{selectedExpense: record.tags.indexOf(item)>=0}
 ">
                <span class="tag-icon">
                    <Icon icon=""></Icon>
                </span>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <FormItem field-name="添加备注" :value.sync="record.notes"></FormItem>
        <number-pads :amount.sync="record.amountToString" @submit="submit" :select="record.type"></number-pads>

    </Card>

</template>


<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import NumberPads from '@/components/Money/numberPads.vue';
    import Card from '@/components/Card.vue';
    import Button from '@/components/Button.vue';
    import FormItem from '@/components/Money/FormItem.vue';

    @Component({
        components: {FormItem, Button, Card, NumberPads}
    })
    export default class extends Vue {
        @Prop() RecordToggle?: boolean;
        @Prop() dataIncome: Tag[] | undefined;
        @Prop() dataExpense: Tag[] | undefined;
        record: RecordItem = {
            notes: '',
            tags: [],
            type: '-',
            amount: 0,
            amountToString: '0'

        };

        handleClick() {

            this.$emit('update:RecordToggle', false);
        }

        setType() {
            if (this.record.type !== '+') {
                this.record.type = '+';
            } else {
                this.record.type = '-';
            }
        }

        submit() {
            this.record.amount = parseFloat(this.record.amountToString as string) | 0;
            this.$store.commit('createRecord',this.record);
            this.$emit('update:RecordToggle', false);
            this.record = {
                notes: '',
                tags: [],
                type: '-',
                amount: 0,
                amountToString: '0'
            };
        }

        handleTag(tag: Tag) {
            const index = this.record.tags.indexOf(tag);
            if (this.record.tags.length == 0) {
                this.record.tags.push(tag);
            } else if (this.record.tags.indexOf(tag) >= 0) {
                this.record.tags.splice(index, 1);
            } else {
                this.record.tags = [];
                this.record.tags.push(tag);
            }
        }


    }
</script>

<style lang='scss' scoped>
    ::-webkit-scrollbar {
        display: none
    }

    .types {

        padding: 16px;
    }

    .output {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #666666;
        width: 90%;
        margin: 0 auto;

        > span {
            height: 64px;
            font-size: 2.5em;

        }

        > div {
            flex-grow: 1;
            text-align: right;
            font-size: 2em;
            line-height: 2em;

        }
    }

    .tagList {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        padding: 24px;
        align-items: center;

        & > .tag-item {
            &.selectedExpense {
                & > .tag-icon {
                    background: #40B475;
                }
            }

            &.selectedIncome {
                & > .tag-icon {
                    background: #F0B739;
                }
            }

            margin-right: 16px;
            list-style: none;

            display: flex;
            flex-direction: column;
            align-items: center;
            flex: none;

            & > .tag-icon {
                background-color: #ECECEC;
                border-radius: 50%;
                padding: 8px;
            }

            & > :nth-child(2) {
                margin-top: 8px;
                font-size: .8em;
            }

        }
    }


</style>
