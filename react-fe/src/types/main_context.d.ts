export type TView = "landing" | "gaming"
export type TModalView = "ranking" | "in-game-rank"

export interface IMainContext {
    view: TView
    modalView: TModalView
    updateView: {
        setView: (name: TView) => void,
        setModalView: (name: TModalView) => void
    }
    modalController: {
        isOpen: boolean,
        onOpen: ()=>void,
        onClose: ()=>void,
        onOpenChange: ()=>void
    }
}