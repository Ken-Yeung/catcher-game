export interface IGameContext {
    timer: {
        time: number
        setTime: Dispatch<SetStateAction<number>>
        intervalId: NodeJS.Timeout | null
        setIntervalId: Dispatch<SetStateAction<NodeJS.Timeout | null>>
        isRunning: boolean
        setIsRunning: Dispatch<SetStateAction<boolean>>
        reset: ()=>void
        clear: ()=>void
        setup: ()=>void
    }
}