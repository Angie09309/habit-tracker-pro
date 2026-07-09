import { useHabits } from "../hooks/useHabits";
import { initialDays } from "../data/initialData";

export function Today() {

    const { habits } = useHabits();
    console.log(initialDays)
    return (
        <div className="p-4 bg-slate-900">{
            habits.map((habit) => (
                <div key={habit.id}>
                    {habit.name}
                </div>
            ))

        }</div>
    );
}