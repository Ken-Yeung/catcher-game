import { createContext, useContext, useState } from "react";
import { ILeaderboardContext } from "../types/leaderboard_context";
import { IRecord } from "../types/record";
import CatcherAPI from "../services/api";

const LeaderboardContext = createContext<ILeaderboardContext>({
    records: [],
    actions: {
        fetchRecords: async () => []
    }
});

export const LeaderboardContextProvider = ({ children }: { children: any }) => {

    const [records, setRecords] = useState<IRecord[]>([])

    const fetchRecords = async () => {
        const catcherApi = new CatcherAPI()
        const resp = await catcherApi.getRecords()
        setRecords(resp)
        return resp
    }

    return <LeaderboardContext.Provider value={{
        records: records,
        actions: {
            fetchRecords: fetchRecords
        }
    }}>
        {children}
    </LeaderboardContext.Provider>;
};

export const useLeaderboardContext = () => useContext(LeaderboardContext);