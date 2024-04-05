import { useEffect, useState } from "react";
import { useCatcherAPI } from "../services/api";
import { IMyRecord, IRecord } from "../types/record";
import { useGameContext } from "../contexts/game_context";
import LeaderboardRow from "../compoents/leaderboard_row";
import { FaPlay } from "react-icons/fa";
import { Button, Input } from "@nextui-org/react";
import { MdDoneOutline, MdMenuBook } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useMainContext } from "../contexts/main_context";

export default function InGameRank() {
  const { user, updateUser, timer } = useGameContext();
  const catcherAPI = useCatcherAPI();
  const [myRecord, setMyRecord] = useState<IMyRecord[]>([]);
  const [nameCache, setNameCache] = useState(user?.name);
  const { modalController, updateView } = useMainContext();

  useEffect(() => {
    if (user?.id != 0) {
      new Promise(async (resolve) => {
        const resp = await catcherAPI.getRecords(user?.id.toString());

        setMyRecord(resp as IMyRecord[]);

        resolve("");
      });
    }
  }, [user]);

  const handleNameUpdate = () => {
    if (nameCache != "") {
      catcherAPI
        .postRecord({
          name: nameCache ?? "New Player",
          score: user!.score, // Final Score
          id: user?.id,
        })
        .then((resp) => {
          const res = resp as any as IRecord;
          catcherAPI.getRecords(res.id?.toString()).then((result) => {
            const _res = result as IMyRecord[];
            updateUser({
              id: _res[0].id!,
              name: _res[0].name,
              score: _res[0].score,
              rank: _res[0].rank,
            });
          });
        });
    }
  };

  const handleOnPlay = () => {
    timer.setIsRunning(true);
    timer.setup();
    modalController.onClose();
  };

  const handleReset = () => {
    updateUser({
      id: 0,
      name: "New Player",
      rank: 0,
      score: 0,
    });
    updateView.setView("landing");
    modalController.onClose();
  };

  const handleOpenRanking = () => {
    updateView.setView("landing");
    updateView.setModalView("ranking");
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-5xl font-bold text-center text-green-500">
        Time's' Up!
      </h1>
      {myRecord.length > 0 && (
        <div className="mt-9 border-b border-b-gray-500 pb-6">
          <LeaderboardRow
            rank={myRecord[0].rank}
            name={`${myRecord[0].name}#${myRecord[0].id}`}
            score={myRecord[0].score}
          />
        </div>
      )}

      <div className="w-full flex justify-center items-center gap-3">
        <Input
          isClearable
          type="text"
          label="Name"
          variant="bordered"
          placeholder="Enter your name"
          value={nameCache}
          onChange={(e) => {
            setNameCache(e.target.value);
          }}
          onClear={() => {
            setNameCache("");
          }}
          color="warning"
          className="max-w-xs"
          classNames={{
            input: "text-base",
          }}
        />
        {/* Update Name */}
        <Button
          isIconOnly
          variant="ghost"
          className="text-white"
          size="lg"
          onClick={handleNameUpdate}
        >
          <MdDoneOutline />
        </Button>
      </div>

      <div className="w-full flex justify-center items-center mt-3 gap-3">
        {/* Play Button */}
        <Button
          isIconOnly
          variant="ghost"
          className="text-white"
          size="lg"
          onClick={handleOnPlay}
        >
          <FaPlay />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          className="text-white text-2xl"
          size="lg"
          onClick={handleReset}
        >
          <GrPowerReset />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          className="text-white text-2xl"
          size="lg"
          onClick={handleOpenRanking}
        >
          <MdMenuBook />
        </Button>
      </div>
    </div>
  );
}
