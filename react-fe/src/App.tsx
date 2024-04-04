import { useEffect, useState } from "react";
import { useMainContext } from "./contexts/main_context";
import { TView } from "./types/main_context";
import { IViewCollection } from "./types/view";
import LandingPage from "./views/landing";
import MainModal from "./compoents/main_modal";

const viewCollection: IViewCollection<TView> = {
  landing: <LandingPage />,
  gaming: <><h1 className="text-white">Gaming Page</h1></>
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
