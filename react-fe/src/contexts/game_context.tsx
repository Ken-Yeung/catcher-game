import { createContext, useContext, useState } from "react";
import { IGameContext, IUser } from "../types/game_context";
import { getRandomInt } from "../utils/ran_num";

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
    setup: () => { },
  },
  updateUser: () => { },
  game: {
    score: 0,
    setScore: (score: number) => { },
    droppingItems: {
      positions: [],
      updatePositions: () => { },
    },
    start: () => { },
    stop: () => { },
    setup: () => { },
  },
});

export const GameContextProvider = ({ children }: { children: any }) => {
  const defaultCountdown = 10;
  const [time, setTime] = useState(defaultCountdown);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [user, setUser] = useState<IUser>();
  const [score, setScore] = useState(0);
  const [droppingItemPos, setDroppingItemPos] = useState<number[][]>([]);
  const [gameIntervalId, setGameIntervalId] = useState<NodeJS.Timeout | null>(null);

  const setupTimer = () => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prev: number) => {
          return prev - 1;
        });
      }, 1000); // Decrement every second
      setIntervalId(id);
    }
  };

  const resetTimer = () => {
    setTime(defaultCountdown);
    setIsRunning(false);
    clearingTimer();
  };

  const clearingTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const updateUser = (user?: IUser) => {
    setUser(user);
  };

  const setupGame = () => {
    if (gameIntervalId) {
      clearInterval(gameIntervalId);
    }

    let counter = 0

    const id = setInterval(() => {
      setIsRunning((status) => {
        if (status) {
          // Game Running
          const screenHeight = window.innerHeight;
          // Insert New Dropdown -> Each 3 Sec
          if (counter == 0) {
            const screenWidth = window.innerWidth;
            const maxXPosition = screenWidth - 6 * 16; // Assuming 1rem = 16px
            const xPos = getRandomInt(maxXPosition);

            setDroppingItemPos((prevPos) => {
              return [...prevPos, [xPos, 0]]
            })
          }

          // Reset Counter After 20 times
          if (counter > 19) {
            counter = 0
          } else {
            counter += 1
          }
          // Modify All Dropdown yPos if not hit bottom
          setDroppingItemPos((prevPos) => {
            return prevPos.map((_) => {
              if (_[1] < screenHeight) {
                return [_[0], _[1] + 3]
              } else {
                return _
              }
            })
          })
          // If Reached Bottom || Hit Character -> Hidden

        } else {
          // Game Stop
          console.log("Game Stop");

        }
        return status
      })

    }, 100); // Decrement every 0.333 sec
    setGameIntervalId(id);
  }

  const startGame = () => {
    setIsRunning(true)
    setupTimer()
  }

  const stopGame = () => {
    setIsRunning(false)
    clearingTimer()
  }

  return (
    <GameContext.Provider
      value={{
        timer: {
          time,
          setTime,
          setIntervalId,
          intervalId,
          isRunning,
          setIsRunning,
          reset: resetTimer,
          clear: clearingTimer,
          setup: setupTimer,
        },
        user: user,
        updateUser,
        game: {
          score,
          setScore,
          droppingItems: {
            positions: droppingItemPos,
            updatePositions: setDroppingItemPos,
          },
          start: startGame,
          stop: stopGame,
          setup: setupGame
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
