import { Card, CardBody, Button } from "@nextui-org/react";
import { useMainContext } from "../contexts/main_context";
import TitlesLabel from "../compoents/titles";

export default function LandingPage() {
    const { updateView, modalController } = useMainContext()

    const handleLeaderBoardOnClick = () => {
        modalController.onOpen()
    }

    const handleStartGameOnClick = () => {
        updateView.setView("gaming")
    }

    return (
        <Card
            isBlurred
            className="border-none bg-default-100/50 !w-[90%] max-w-[610px] max-h-[72%]"
            shadow="sm"
        >
            <CardBody className="overflow-y-hidden">
                <div className="w-full h-full pt-24 flex flex-col">
                    {/* Title */}
                    <TitlesLabel label={"Catcher Game"} />
                    {/* Button Group */}
                    <div className="h-fit mt-24 md:mt-36 flex flex-col items-center gap-9">
                        <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-[60%]" onClick={handleStartGameOnClick}>Start Game</Button>
                        <Button className="shadow-lg w-[60%]" color="primary" onClick={handleLeaderBoardOnClick} >Leader Board</Button>
                    </div>
                </div>
                {/* Footer */}
                <div className="flex flex-col items-center justify-end">
                    <h3 className="text-white text-sm font-sans font-thin">Created by Ken Yeung</h3>
                </div>
            </CardBody>
        </Card>
    )
}
