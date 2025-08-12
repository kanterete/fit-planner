import { DietDay } from "@/types/types";
import { getDate } from "@/utils/getDate";
import { useState } from "react";

export const useDiet = (
  diet: DietDay[],
  setDiet: React.Dispatch<React.SetStateAction<DietDay[]>>
) => {
  const today = getDate();

  const [mealTime, setMealTime] = useState("Breakfast");
  const [mealDate, setMealDate] = useState(today);
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState<number>(0);

  const resetForm = () => {
    setMealName("");
    setMealCalories(0);
  };

  const isFormValid = !!mealName.trim();

  const addMeal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const stored = localStorage.getItem("diet");
    const parsed: Record<string, DietDay> = stored ? JSON.parse(stored) : {};

    //If there's not a day, add one
    if (!parsed[mealDate]) {
      parsed[mealDate] = {
        id: Date.now(),
        date: mealDate,
        meals: [],
      };
    }

    //read meals object from parsed data
    const meals = parsed[mealDate].meals;
    const existingMeal = meals.find((m) => m.time === mealTime);

    if (existingMeal) {
      existingMeal.items.push(mealName);
      existingMeal.calories += mealCalories;
    } else {
      meals.push({
        time: mealTime,
        items: [mealName],
        calories: mealCalories,
      });
    }

    setDiet(Object.values(parsed));
    localStorage.setItem("diet", JSON.stringify(parsed));

    resetForm();
  };

  return {
    diet,
    setDiet,
    mealTime,
    setMealTime,
    mealDate,
    setMealDate,
    mealName,
    setMealName,
    mealCalories,
    setMealCalories,
    addMeal,
    isFormValid,
  };
};
