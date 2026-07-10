import { useState } from "react";
import { initialDays } from "../data/initialData";

export function useHabits() {
  const [habits, setHabits] = useState(initialDays[0].habitos);
  return { habits };
}
