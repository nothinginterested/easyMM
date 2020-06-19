type RecordItem = {
    notes: string;
    tags: Tag[];
    type: string;
    amount: number;
    date?: string;
    amountToString?: string;
    id?: string;


};
type Tag = {
    id: number;
    name: string;
    iconName?: string;
}
type RootState = {
    RecordList: RecordItem[];
    TagList: Tag[];
    currentTag?: Tag;
}

type Result = {
    day: string;
    title: string;
    expense: number;
    income: number;
    item: RecordItem[];
}[]
