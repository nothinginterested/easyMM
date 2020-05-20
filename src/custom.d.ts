type RecordItem = {
    notes: string;
    tags: string[];
    type: string;
    amount: number;
    date?: Date;


};
type Tag = {
    id: number;
    name: string;
}