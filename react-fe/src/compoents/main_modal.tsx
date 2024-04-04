import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useMainContext } from "../contexts/main_context";
import { IViewCollection } from "../types/view";
import { TModalView } from "../types/main_context";
import LeaderBoard from "../views/leaderboard";
import InGameRank from "../views/in_game_rank";

const viewCollection: IViewCollection<TModalView> = {
    ranking: <LeaderBoard />,
    "in-game-rank": <InGameRank />
}

export default function MainModal() {
    const { modalController, modalView } = useMainContext()

    return (
        <Modal
            backdrop="opaque"
            isOpen={modalController.isOpen}
            onOpenChange={modalController.onOpenChange}
            radius="lg"
            size="3xl"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
                wrapper: "overflow-hidden"
            }}
            className="z-50"
        >
            <ModalContent className="max-h-[90%]">
                {(onClose) => (
                    <>
                        <ModalBody className="max-h-full overflow-hidden">
                            {viewCollection[modalView as keyof typeof viewCollection]}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" className="text-white" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
