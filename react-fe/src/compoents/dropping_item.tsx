import { motion } from "framer-motion";
import { getRandomInt } from "../utils/ran_num";
import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/game_context";

export default function DroppingItem({
  index,
  isGood = false,
}: {
  index: number;
  isGood?: boolean;
}) {
  const goodCollection: string[] = [];
  const badCollection: string[] = [];

  const { game } = useGameContext();

  // State to store the maximum x position
  // const [maxX, setMaxX] = useState(0);

  // useEffect(() => {
  //   const screenWidth = window.innerWidth;
  //   const maxXPosition = screenWidth - 6 * 16; // Assuming 1rem = 16px
  //   setMaxX(maxXPosition);
  // }, []);

  // const xPos = getRandomInt(maxX);

  // Define the initial and animate states for the motion component
  const initial = { x: 0, y: -50 };
  const animate = {
    x: game.droppingItems.positions[index][0],
    y: game.droppingItems.positions[index][1],
  }; // Move to random x position

  return (
    <motion.div
      className="absolute bg-black !w-24 !h-24 rounded-full"
      initial={initial}
      animate={animate}
      transition={{ type: "tween", duration: 0.3 }}
    ></motion.div>
  );
}
