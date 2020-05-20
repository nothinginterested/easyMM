type RecordItem = {
    notes: string;
    tags: Tag[];
    type: string;
    amount: number;
    date?: string;


};
type Tag = {
    id: number;
    name: string;
}
type RootState = {
    RecordList: RecordItem[];
    TagList: Tag[];
    currentTag?: Tag;
}

type Result = {
    title: string;
    item: RecordItem[];
}[]
