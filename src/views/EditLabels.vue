<template>
    <div style="background: #EDEDED">
        <header>
            <Icon icon="left" @click="goback"></Icon>

        </header>
        <section class="content-wrapper">
            <div>
                <section>
                    <span>
                        <Icon></Icon>
                    </span>
                    <span style="margin-left: 8px">
                        {{Record.tags[0].name}}
                    </span>
                </section>
                <h3>{{Record.type==='+'? '+'+Record.amount:'-'+Record.amount}}</h3>
                <table>
                    <tbody>
                    <tr>
                        <td>记录时间</td>
                        <td>{{Time}}</td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td>{{Record.notes}}</td>
                    </tr>
                    </tbody>
                </table>
                <section class="button-wrapper">
                    <button>删除</button>
                    <span></span>
                    <button>编辑</button>
                </section>

            </div>
        </section>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';
    import clone from '@/lib/clone';
    import dayjs from 'dayjs';

    @Component({
        components: {Button, FormItem: FormItem}
    })

    export default class EditLabels extends Vue {
        tag?: { id: number; name: string } = undefined;
        Record: RecordItem = {
            notes: '',
            tags: [],
            type: '',
            amount: 0,
            date: '',
            amountToString: '',
            id: 0

        };

        goback() {
            console.log('111');
            this.$router.back();
        }

        get Time() {
            return dayjs(this.Record.date).format('YYYY年MM月DD日 HH:mm');
        }

        created() {
            const id = this.$route.params.id;
            this.$store.commit('fetchRecords');
            const Records: RecordItem[] = clone(this.$store.state.RecordList);
            const i = Records.filter(item => {
                return item.id.toString() === id;

            });
            this.Record = i[0];
            console.log(id);
            console.log(i);

        }

    }
</script>

<style lang='scss' scoped>

    ::v-deep header {
        padding: 24px 12px;

        & > svg {
            font-size: 28px;
        }
    }

    .content-wrapper {
        padding: 0 12px;

        & > div {
            padding: 16px;
            border-radius: 8px;
            text-align: center;
            background: white;

            & > section:first-of-type {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 12px;

                & > span:first-of-type {
                    padding: 8px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background: #F0B739;

                }

            }

            & > h3 {
                margin: 16px 0;
                font-size: 2.4em;
                font-weight: normal;
                letter-spacing: 1px;

            }

            & > table {
                margin-bottom: 16px;
                text-align: left;
                border-collapse: separate;
                border-spacing: 10px;


                & > tbody > tr > td:first-of-type {
                    color: #909399;
                    padding-right: 12px;
                }
            }

            & > .button-wrapper {
                display: flex;
                padding: 16px 0 0;
                border-top: 1px solid #eeee;

                & > button {
                    flex-grow: 1;
                    border: none;
                    background: none;

                }

                & > button:first-of-type {
                    color: #F76361;
                }

            }

        }

    }

</style>
