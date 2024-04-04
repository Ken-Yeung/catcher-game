import { Divider } from "@nextui-org/react";
import LeaderboardRow from "../compoents/leaderboard_row";
import TitlesLabel from "../compoents/titles";

export default function LeaderBoard() {
    return (
        <div className="leaderboard-wrapper max-h-full overflow-auto">
            <TitlesLabel label={"Leaderboard"} className="sticky top-0 bg-[#19172c]" />
            <Divider className="my-3 bg-gray-500" />
            <div className="flex flex-col py-3 gap-3">
                <LeaderboardRow rank={1} name="MikeMikeMikeMikeMikeMikeMike" score={123} />
                <LeaderboardRow rank={2} name="MikeMikeMikeMikeMikeMikeMike" score={66} />
            </div>
        </div>
    )
}
