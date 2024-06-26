export interface IGameContext {
  timer: {
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
    intervalId: NodeJS.Timeout | null;
    setIntervalId: Dispatch<SetStateAction<NodeJS.Timeout | null>>;
    isRunning: boolean;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
    reset: () => void;
    clear: () => void;
    setup: () => void;
  };
  user?: IUser;
  updateUser: (user?: IUser) => void;
  game: {
    score: number;
    setScore: (score: number) => void;
    droppingItems: {
      positions: number[][];
      updatePositions: Dispatch<SetStateAction<number[][]>>;
    };
    start: ()=>void
    stop: ()=>void
    setup: ()=>void
    player: {
      xPos: number,
      updateXPos: Dispatch<SetStateAction<number>>
    }
  };
}

export interface IUser {
  id: number;
  name: string;
  score: number;
  rank: number;
}
