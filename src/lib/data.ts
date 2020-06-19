export const ALL_CATEGORIES: Tag[] = [
    {
        id: 0,
        name: '其他',
        iconName: 'rmb'
    },
    {
        id: 1,
        name: '衣服',
        iconName: 'clothes'
    },
    {
        id: 2,
        name: '购物',
        iconName: 'bag'
    },
    {
        id: 3,
        name: '交通',
        iconName: 'bus'
    },
    {
        id: 4,
        name: '餐饮',
        iconName: 'rice'
    },
    {
        id: 5,
        name: '旅行',
        iconName: 'luggage'
    },
    {
        id: 6,
        name: '股票',
        iconName: 'stock'
    },
    {
        id: 7,
        name: '水电媒',
        iconName: 'water-drop'
    },
    {
        id: 8,
        name: '信用卡',
        iconName: 'card'
    },
    {
        id: 9,
        name: '工资',
        iconName: 'salary'
    },
    {
        id: 10,
        name: '转账',
        iconName: 'transfer'
    }
];
const [
    other, clothes, shopping,
    traffic, eat, travel, stock,
    living, salary, transfer
] = ALL_CATEGORIES;

export const DEFAULT_INCOME_CATEGORIES = [
    salary, transfer, stock, other
];

export const DEFAULT_EXPENSE_CATEGORIES = [
    clothes, shopping, traffic, eat, travel, stock, living, transfer, other
];
