import { useEffect } from "react";
import { useGameContext } from "../contexts/game_context";
import { useMainContext } from "../contexts/main_context";

export default function GamingView() {

    const { timer } = useGameContext()
    const { modalController, updateView } = useMainContext()

    // Initialize
    useEffect(() => {
        timer.setIsRunning(true)
    }, [])

    useEffect(() => {
        timer.setup()
        return () => {
            timer.clear()
        };
    }, [timer.isRunning]);

    useEffect(() => {
        if (timer.time <= 0) {
            timer.reset()
            updateView.setModalView("in-game-rank")
            modalController.onOpen()
        }
    }, [timer.time]);

    const TimerLabel = ({ time, status }: { time: number; status: boolean }) => {
        return <div className="absolute top-0 left-0 right-0 z-10 !h-20">
            <div className="w-full flex justify-center pt-3" onClick={() => {
                if (!status) {
                    updateView.setModalView("in-game-rank")
                    modalController.onOpen()
                }
            }}>
                <h1 className={`${status ? 'text-6xl' : 'text-3xl'} font-bold text-white`}>{status ? time : "Finished"}</h1>
            </div>
        </div>
    }


    return (
        <div className="w-full h-full relative">
            <TimerLabel time={timer.time} status={timer.isRunning} />
        </div>
    )
}