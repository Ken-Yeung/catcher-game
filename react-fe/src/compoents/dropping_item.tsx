import { motion } from "framer-motion";
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

  // Define the initial and animate states for the motion component
  const initial = { x: game.droppingItems.positions[index][0], y: -50 };
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
