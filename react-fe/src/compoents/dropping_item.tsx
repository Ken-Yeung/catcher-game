import { motion } from "framer-motion";
import { useGameContext } from "../contexts/game_context";
import { useEffect, useState } from "react";
import { getRandomElement } from "../utils/ran_num";

export default function DroppingItem({
  index,
}: {
  index: number;
}) {
  const [isGood, setIsGood] = useState(parseInt(Math.random().toFixed(0)) == 1)

  const [isCounted, setIsCounted] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const goodCollection: string[] = [
    `${process.env.REACT_APP_API_ORIGIN}/assets/p1.png`,
    `${process.env.REACT_APP_API_ORIGIN}/assets/p2.png`,
    `${process.env.REACT_APP_API_ORIGIN}/assets/p3.png`,
    `${process.env.REACT_APP_API_ORIGIN}/assets/p4.png`,
  ];

  const badCollection: string[] = [
    `${process.env.REACT_APP_API_ORIGIN}/assets/e1.png`,
    `${process.env.REACT_APP_API_ORIGIN}/assets/e2.png`,
  ];

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(isGood ? getRandomElement<string>(goodCollection) : getRandomElement<string>(badCollection));

  const { game } = useGameContext();

  // Define the initial and animate states for the motion component
  const initial = { x: game.droppingItems.positions[index][0], y: -50 };
  const animate = {
    x: game.droppingItems.positions[index][0],
    y: game.droppingItems.positions[index][1],
  }; // Move to random x position

  useEffect(() => {
    // Top Left
    const currentX = game.droppingItems.positions[index][0]
    const currentY = game.droppingItems.positions[index][1]
    // Top Right
    const _trx = currentX + 6 * 16
    const _try = currentY
    // Bottom Left
    const _blx = currentX
    const _bly = currentY + 6 * 16
    // Bottom Right
    const _brx = _trx
    const _bry = _bly


    const screenHeight = window.innerHeight;

    // Player Height
    const bottomLine = screenHeight - (27 + 96)
    const playerCurrentX = game.player.xPos
    const playerXOpo = playerCurrentX + 6 * 16
    if (_bly >= bottomLine && currentY < screenHeight) {
      // Inside Checking Range
      // Check X
      if ((playerCurrentX <= _brx && _brx <= playerXOpo) || (playerCurrentX <= _blx && _blx <= playerXOpo)) {
        // Check Good Or bad && isCounted is false
        if (!isCounted) {
          if (isGood) {
            game.setScore(game.score + 50)
          } else {
            game.setScore(game.score - 100)
          }
          setIsCounted(true)
          setTimeout(() => {
            setIsHidden(true)
          }, 200)
        }
      }

    }

    if (currentY >= screenHeight) {
      setIsCounted(true)
      setTimeout(() => {
        setIsHidden(true)
      }, 500)
    }
  })

  return (
    <motion.div
      className={`absolute ${isGood ? 'bg-green-600' : 'bg-red-600'} !w-24 !h-24 rounded-full`}
      initial={initial}
      animate={animate}
      transition={{ type: "tween", duration: 0.3 }}
      style={{
        display: isHidden ? 'none' : undefined,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed

      }}
    ></motion.div>
  );
}
