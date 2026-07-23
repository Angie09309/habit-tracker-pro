export function HabitCard({ habit }) {
    return (
        <div className="bg-red-500 rounded-xl shadow-md p-10">
            {habit.name}
        </div>
    )
}