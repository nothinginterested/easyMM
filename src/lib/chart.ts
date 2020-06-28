export const barChart = (xData: any[], yData: any[], type: TRecordType, unit: string) => {
    const color = type === 'expense' ? '#40B475' : '#F0B739';
    const name = type === 'expense' ? '支出' : '收入';

    return {
        tooltip: {
            show: true,
            trigger: 'item',
            axisPointer: {
                type: 'shadow',
                axis: 'auto',
            },
            padding: 5,
            textStyle: {
                color: '#eee'
            },
        },
        grid: {
            width:'800'
        },
        xAxis: {
            axisLabel: {
                formatter: `{value}\n${unit}`,
                textStyle: {
                    color: '#909399'
                }
            },



            data: xData,
            type: 'category',
            axisTick: {
                length: 5
            }
        },
        yAxis: {
            show: false
        },
        series: [
            {
                type: 'bar',
                name,
                data: yData,
                label: {
                    show: true,
                    position: 'top',
                    color,
                    formatter: (data: any) => data.value === 0 ? '' : `￥${data.value.toFixed(2)}`,
                },
                itemStyle: {
                    color,
                },
                barMinHeight: 4,
                barMaxWidth:6
            }
        ]
    };
};
