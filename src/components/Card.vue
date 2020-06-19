<template>
    <div class="Shadow" @click="handleClick">
        <div class="Main" @click.stop>
            <header class="header">
                <div @click.stop="handleClick">
                    <Icon icon="cross" ></Icon>

                </div>
                <span>{{this.title}}</span>
                <Icon icon="cross" color="transparent"></Icon>
            </header>
            <slot></slot>
        </div>

    </div>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import NumberPads from '@/components/Money/numberPads.vue';

    @Component({
        components: {NumberPads}
    })
    export default class extends Vue {


        @Prop({default: ''}) title: string | undefined;

        handleClick(){
            this.$emit('toggleOff',[1,2])
        }

    }
</script>

<style lang='scss' scoped>
    .Shadow {
        width: 100%;
        height: 100%;
        bottom:0;
        position: absolute;
        background: rgba(0,0,0,0.5);
        z-index: 4;
        > .Main {
            position: absolute;
            width: 100%;
            bottom: 0;
            z-index: 5;
            border-radius: 8px 8px 0 0;
            background: white;
            overflow: hidden;

            & > .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                border-bottom: 1px solid #eee;
                font-size: 18px;
                background: #FAFAFA;

                & > .icon.transparent-wrapper {
                    color: transparent;
                }

            }

        }


    }

    ::v-deep {
        .icon {
            width: 16px;
            height: 16px;


        }


    }

</style>
