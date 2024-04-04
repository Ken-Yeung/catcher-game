import { LuCrown } from "react-icons/lu";

export default function LeaderboardRow({ rank, name, score }: { rank: number; name: string; score: number }) {
    return (
        <div className="grid grid-cols-3 text-xl">
            {/* Rank */}
            <p className="pr-6 h-fit flex items-center justify-end gap-3">{rank < 4 && <span><LuCrown className={colorSwitch(rank)} /></span>} <span>{rank}</span></p>
            {/* Name */}
            <p className="text-start px-2 whitespace-nowrap text-ellipsis overflow-hidden">{name}</p>
            {/* Score */}
            <p className="text-start pl-3">{score} Points</p>
        </div>
    )
}

function colorSwitch(rank:number): string {
    switch(rank){
        case 1:
            return "text-[#FFD700]"
        case 2:
            return "text-[#C0C0C0]"
        case 3:
            return "text-[#CD7F32]"
        default:
            return "hidden"
    }
}