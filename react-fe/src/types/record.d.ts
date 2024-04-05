export interface IRecord {
    id?: number;
    name: string;
    score: number;
}

export interface IMyRecord extends IRecord {
    rank: number
}