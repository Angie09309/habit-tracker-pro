import { useHabits } from "../hooks/useHabits";
import { initialDays } from "../data/initialData";
import { HabitCard } from "../components/HabitCard";

export function Today() {

    const { habits } = useHabits();
    console.log(habits)
    return (
        <div className="p-4 bg-slate-900">{
            habits.map((habit) => (
                <HabitCard habit={habit} key={habit.id} />
            ))
        }</div>
    );
}