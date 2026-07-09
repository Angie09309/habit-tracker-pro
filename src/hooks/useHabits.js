import { useState } from "react";

export function useHabits() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "feliz",
      emoji: "😄",
      color: "#FF0000",
      completed: false,
    },
  ]);
  return { habits };
}
