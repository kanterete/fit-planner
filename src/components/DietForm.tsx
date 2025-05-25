"use client";
import { CalendarHeart, Clock, Flame, Pen, ScrollText } from "lucide-react";
import React, { useState } from "react";
import AddMealButton from "./AddMealButton";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { DietDay } from "@/types/types";

const DietForm = () => {
  const today = getFormattedDate();

  const [mealTime, setMealTime] = useState("");
  const [mealDate, setMealDate] = useState(today);
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState<number>(0);

  const collectData = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mealName || mealCalories === null || !mealTime) return;

    const stored = localStorage.getItem("diet");
    const parsed: Record<string, DietDay> = stored ? JSON.parse(stored) : {};

    //If there's not current day, add one
    if (!parsed[mealDate]) {
      parsed[mealDate] = {
        id: Date.now(),
        date: mealDate,
        meals: [],
      };
    }

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

    localStorage.setItem("diet", JSON.stringify(parsed));

    //Clear after adding
    setMealName("");
    setMealCalories(0);
  };

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <ScrollText color="blue" /> Add meal
      </h1>
      <form className="text-black border-0 border-gray-200 w-full">
        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealTime">
          Meal Time <Clock color="blue" />
        </label>

        <select
          id="mealTime"
          className="w-full border-2 p-0.5 border-gray-200 rounded-xl mb-4"
          value={mealTime}
          onChange={(e) => setMealTime(e.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealTime">
          Meal Date <CalendarHeart color="blue" />
        </label>

        <input
          id="mealDate"
          type="date"
          className="w-full border-2 p-0.5 border-gray-200 rounded-xl mb-4"
          placeholder=" Meal date"
          value={mealDate}
          onChange={(e) => setMealDate(e.target.value)}
          min={today}
        />

        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealName">
          Meal Name
          <Pen color="blue" />
        </label>

        <input
          id="mealName"
          type="text"
          name="mealName"
          placeholder=" Meal name"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="mealCalories"
        >
          Meal Calories
          <Flame color="blue" />
        </label>

        <input
          id="mealCalories"
          type="number"
          name="mealCalories"
          placeholder=" Meal calories"
          className="rounded-xl p-0.5 border-2 border-gray-200 w-full"
          min={0}
          max={9999}
          value={mealCalories}
          onChange={(e) => setMealCalories(Number(e.target.value))}
        />
      </form>
      <AddMealButton collectData={collectData} />
    </div>
  );
};

export default DietForm;
