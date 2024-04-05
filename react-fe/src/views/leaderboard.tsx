import { Divider } from "@nextui-org/react";
import LeaderboardRow from "../compoents/leaderboard_row";
import TitlesLabel from "../compoents/titles";
import { useEffect, useState } from "react";
import { useLeaderboardContext } from "../contexts/leaderboard_context";
import { initSocket } from "../services/socket_service";
import { IMyRecord } from "../types/record";
import { useGameContext } from "../contexts/game_context";
import { useCatcherAPI } from "../services/api";

export default function LeaderBoard() {
  const { actions, records } = useLeaderboardContext();
  const catcherAPI = useCatcherAPI();
  const { user } = useGameContext();
  const [myRecord, setMyRecord] = useState<IMyRecord[]>([]);

  const updateUserRank = () => {
    if (user?.id != 0) {
      new Promise(async (resolve) => {
        const resp = await catcherAPI.getRecords(user?.id.toString());

        setMyRecord(resp as IMyRecord[]);

        resolve("");
      });
    }
  };

  useEffect(() => {
    actions.fetchRecords();
    updateUserRank();
    const socket = initSocket((resp) => {
      if (resp.message == "update") {
        actions.fetchRecords();
        updateUserRank();
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="leaderboard-wrapper max-h-full overflow-auto">
      <TitlesLabel
        label={"Leaderboard"}
        className="sticky top-0 bg-[#19172c]"
      />
      <Divider className="my-3 bg-gray-500" />
      {myRecord.length > 0 && (
        <div className="mt-6 border-b border-b-gray-500 pb-6">
          <LeaderboardRow
            rank={myRecord[0].rank}
            name={`${myRecord[0].name}#${myRecord[0].id}`}
            score={myRecord[0].score}
          />
        </div>
      )}
      <div className="flex flex-col py-3 gap-3">
        {records.map((_, _index) => {
          return (
            <LeaderboardRow
              key={_index}
              rank={_index + 1}
              name={`${_.name}#${_.id!}`}
              score={_.score}
              className={
                user?.id == _.id
                  ? "bg-[#FFD700] rounded-xl text-black"
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
