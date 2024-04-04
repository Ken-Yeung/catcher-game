import { useEffect, useState } from "react";
import { useMainContext } from "./contexts/main_context";
import { TView } from "./types/main_context";
import { IViewCollection } from "./types/view";
import LandingPage from "./views/landing";
import MainModal from "./compoents/main_modal";
import GamingView from "./views/gaming";
import { useGameContext } from "./contexts/game_context";

const viewCollection: IViewCollection<TView> = {
  landing: <LandingPage />,
  gaming: <GamingView />
}

function App() {

  const [bgImg, setBgImg] = useState("bg-watermark")
  const { view } = useMainContext()
  const { updateUser } = useGameContext()

  useEffect(() => {
    // Init user
    updateUser({
      id: 774237,
      // id: 576843,
      name: "",
      rank: 0,
      score: 0
    })
  }, [])

  useEffect(() => {
    if (view == "gaming") {
      setBgImg("bg-game")
    } else {
      setBgImg("bg-watermark")
    }
  }, [view])

  return (
    <>
      <div className={`w-full h-full flex flex-col justify-center items-center ${bgImg}`}>
        {viewCollection[view as keyof typeof viewCollection]}
      </div>
      <MainModal />
    </>
  );
}

export default App;
