export default function TitlesLabel({ label, className }: { label: string; className?: string }) {
    return (
        <h1 className={`text-3xl md:text-5xl font-mono font-bold text-center ${className ?? ""}`}>{label}</h1>
    )
}
