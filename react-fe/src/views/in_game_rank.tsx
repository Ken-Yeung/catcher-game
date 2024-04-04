import { useEffect, useState } from "react"
import { useCatcherAPI } from "../services/api"
import { IMyRecord, IRecord } from "../types/record"
import { useGameContext } from "../contexts/game_context"
import LeaderboardRow from "../compoents/leaderboard_row"

export default function InGameRank() {
    const { user } = useGameContext()
    const catcherAPI = useCatcherAPI()
    const [myRecord, setMyRecord] = useState<IMyRecord[]>([])

    useEffect(() => {
        if (user?.id != 0) {
            new Promise(async (resolve) => {
                const resp = await catcherAPI.getRecords(user?.id.toString())

                setMyRecord(resp as IMyRecord[])

                resolve("")
            })
        }
    }, [])

    return (
        <div className='w-full h-full flex flex-col gap-3'>
            <h1 className='text-5xl font-bold text-center text-green-500'>Time's' Up!</h1>
            {
                myRecord.length > 0 && <div className="my-9 border-b border-b-gray-500 pb-6">
                    <LeaderboardRow rank={myRecord[0].rank} name={`${myRecord[0].name}#${myRecord[0].id}`} score={myRecord[0].score} />
                </div>
            }

            {/* Score */}
            {/* Name */}
            {/* Update? */}
            {/* If Have User, Need Reset and update? */}
            {/* Start Game */}
            {/* If paused Continue Game */}
            {/* <LeaderBoard /> */}
        </div>
    )
}
