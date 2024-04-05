import { useEffect } from "react";
import { useGameContext } from "../contexts/game_context";
import { useMainContext } from "../contexts/main_context";
import { useCatcherAPI } from "../services/api";
import { IMyRecord, IRecord } from "../types/record";
import DroppingItem from "../compoents/dropping_item";

export default function GamingView() {
  const { timer, updateUser, game, user } = useGameContext();
  const { modalController, updateView } = useMainContext();
  const catcherAPI = useCatcherAPI();

  // Initialize
  useEffect(() => {
    timer.setIsRunning(true);
  }, []);

  useEffect(() => {
    timer.setup();
    return () => {
      timer.clear();
    };
  }, [timer.isRunning]);

  useEffect(() => {
    if (timer.time <= 0) {
      timer.reset();
      updateView.setModalView("in-game-rank");
      modalController.onOpen();

      // Update Record and update user
      catcherAPI
        .postRecord({
          name: user?.name ?? "New Player",
          score: game.score, // Final Score
          id: user?.id != 0 ? user?.id : undefined,
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
  }, [timer.time]);

  const HeaderLabel = ({ time, status }: { time: number; status: boolean }) => {
    return (
      <div className="absolute top-0 left-0 right-0 z-10 !h-20">
        <div
          className="w-full flex justify-center pt-3"
          onClick={() => {
            if (!status) {
              updateView.setModalView("in-game-rank");
              modalController.onOpen();
            }
          }}
        >
          <h1
            className={`${
              status ? "text-6xl" : "text-3xl"
            } font-bold text-white text-center`}
          >
            {status ? (
              <>
                <span>{time}</span>
              </>
            ) : (
              <>
                <span>Finished</span>
                <br />
                <span className="text-lg">Tap to open menu</span>
              </>
            )}
            <br />
            <span className="text-xl">Score: {game.score}</span>
          </h1>
        </div>
      </div>
    );
  };

  return (
    <div id="main-game-field" className="w-full h-full relative">
      <HeaderLabel time={timer.time} status={timer.isRunning} />
      {/* <DroppingItem isGood />
      <DroppingItem />
      <DroppingItem /> */}
    </div>
  );
}
