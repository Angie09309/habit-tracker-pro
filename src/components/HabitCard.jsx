export function HabitCard({ habit }) {
    return (
        <div className="bg-surface rounded-xl shadow-md p-10">
            {habit.name}
        </div>
    )
}
