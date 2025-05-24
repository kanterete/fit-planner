import { Clock, Flame, Pen, ScrollText } from "lucide-react";
import React from "react";
import AddMealButton from "./AddMealButton";

const DietForm = () => {
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
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

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
        />
      </form>
      <AddMealButton />
    </div>
  );
};

export default DietForm;
