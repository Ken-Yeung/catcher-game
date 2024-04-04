import { useEffect, useState } from "react";
import { useMainContext } from "./contexts/main_context";
import { TView } from "./types/main_context";
import { IViewCollection } from "./types/view";
import LandingPage from "./views/landing";
import MainModal from "./compoents/main_modal";
import GamingView from "./views/gaming";

const viewCollection: IViewCollection<TView> = {
  landing: <LandingPage />,
  gaming: <GamingView />
}

function App() {

  const [bgImg, setBgImg] = useState("bg-watermark")
  const { view } = useMainContext()

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
