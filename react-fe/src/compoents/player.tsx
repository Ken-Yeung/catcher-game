import { motion, useMotionValue } from "framer-motion"
import { useGameContext } from "../contexts/game_context"

export default function Player() {
    const { game } = useGameContext()
    const x = useMotionValue(game.player.xPos)

    x.on('change', (value) => {
        game.player.updateXPos(value)
    })

    const screenWidth = window.innerWidth;
    const maxXPosition = screenWidth - 6 * 16; // Assuming 1rem = 16px

    const backgroundImageUrl = `${process.env.REACT_APP_API_ORIGIN}/assets/boat.png`;

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: maxXPosition }}
            style={{
                x,
                width: '6rem',
                height: '6rem',
                position: 'absolute',
                bottom: 27,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover', // Adjust as needed
                backgroundPosition: 'center', // Adjust as needed
            }}
        >
        </motion.div>
    )
}
