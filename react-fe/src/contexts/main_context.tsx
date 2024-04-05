import { createContext, useContext, useState } from "react";
import { IMainContext, TModalView, TView } from "../types/main_context";
import { useDisclosure } from "@nextui-org/react";

const MainContext = createContext<IMainContext>({
    modalView: 'ranking',
    view: 'landing',
    updateView: {
        setView: () => { },
        setModalView: () => { }
    },
    modalController: {
        isOpen: false,
        onClose: () => { },
        onOpen: () => { },
        onOpenChange: () => { },
    }
});

export const MainContextProvider = ({ children }: { children: any }) => {
    const disclosure = useDisclosure();
    const [view, setView] = useState<TView>("landing")
    const [modalView, setModalView] = useState<TModalView>("ranking")

    const updateMainView = (name: TView) => {
        setView(name)
    }

    const updateModalView = (name: TModalView) => {
        setModalView(name)
    }

    return <MainContext.Provider value={
        {
            view,
            modalView,
            updateView: {
                setView: updateMainView,
                setModalView: updateModalView
            },
            modalController: disclosure
        }
    }>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);