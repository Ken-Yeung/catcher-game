import { createContext, useContext, useState } from "react";
import { IGameContext, IUser } from "../types/game_context";

const GameContext = createContext<IGameContext>({
    timer: {
        time: 0,
        setTime: () => { },
        setIntervalId: () => { },
        intervalId: null,
        isRunning: false,
        setIsRunning: () => { },
        reset: () => { },
        clear: () => { },
        setup: () => { }
    },
    updateUser: () => { }
});

export const GameContextProvider = ({ children }: { children: any }) => {
    const defaultCountdown = 3
    const [time, setTime] = useState(defaultCountdown)
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [user, setUser] = useState<IUser>()

    const setupTimer = () => {
        if (isRunning) {
            const id = setInterval(() => {
                setTime((prev: number) => {
                    return prev - 1
                });
            }, 1000); // Decrement every second
            setIntervalId(id);
        }
    }

    const resetTimer = () => {
        setTime(defaultCountdown);
        setIsRunning(false);
        clearingTimer()
    };

    const clearingTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    const updateUser = (user?: IUser) => {
        setUser(user)
    }

    return <GameContext.Provider value={{
        timer: {
            time,
            setTime,
            setIntervalId,
            intervalId,
            isRunning,
            setIsRunning,
            reset: resetTimer,
            clear: clearingTimer,
            setup: setupTimer
        },
        user: user,
        updateUser
    }}>
        {children}
    </GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);