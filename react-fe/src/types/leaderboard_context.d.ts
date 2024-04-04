import { IRecord } from "./record";

export interface ILeaderboardContext {
    records: IRecord[],
    actions: {
        fetchRecords: () => Promise<IRecord[]>
    }
}