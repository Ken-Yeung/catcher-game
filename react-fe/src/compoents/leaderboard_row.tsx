
export default function LeaderboardRow({ rank, name, score }: { rank: number; name: string; score: number }) {
    return (
        <div className="grid grid-cols-3 text-xl">
            {/* Rank */}
            <p className="text-end pr-3">{rank}</p>
            {/* Name */}
            <p className="text-center px-2 whitespace-nowrap text-ellipsis overflow-hidden">{name}</p>
            {/* Score */}
            <p className="text-start pl-3">{score}</p>
        </div>
    )
}
