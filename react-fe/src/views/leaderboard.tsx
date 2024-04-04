import { Divider } from "@nextui-org/react";
import LeaderboardRow from "../compoents/leaderboard_row";
import TitlesLabel from "../compoents/titles";
import { useEffect } from "react";
import { useLeaderboardContext } from "../contexts/leaderboard_context";
import { initSocket } from "../services/socket_service";

export default function LeaderBoard() {

    const { actions, records } = useLeaderboardContext()

    useEffect(() => {
        actions.fetchRecords()
        const socket = initSocket((resp) => {
            if (resp.message == "update") {
                actions.fetchRecords()
            }
        })
        return () => {
            socket.disconnect()
        }

    }, [])

    return (
        <div className="leaderboard-wrapper max-h-full overflow-auto">
            <TitlesLabel label={"Leaderboard"} className="sticky top-0 bg-[#19172c]" />
            <Divider className="my-3 bg-gray-500" />
            <div className="flex flex-col py-3 gap-3">
                {
                    records.map((_, _index) => {
                        return <LeaderboardRow key={_index} rank={_index + 1} name={`${_.name}#${_.id!}`} score={_.score} />
                    })
                }
            </div>
        </div>
    )
}
