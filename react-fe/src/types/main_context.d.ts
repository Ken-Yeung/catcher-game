export type TView = "landing" | "gaming"
export type TModalView = "ranking"

export interface IMainContext {
    view: TView
    modalView: TModalView
    updateView: {
        setView: (name: TView) => void,
        setModalView: (name: TModalView) => void
    }
}