"use client";
import { CalendarHeart, Clock, Flame, Pen, ScrollText } from "lucide-react";
import React from "react";
import { getDate } from "@/utils/getDate";
import { DietDay } from "@/types/oldTypes";
import { useDiet } from "@/hooks/useDiet";

type DietFormProps = {
  diet: DietDay[];
  setDiet: React.Dispatch<React.SetStateAction<DietDay[]>>;
};

const DietForm = ({ diet, setDiet }: DietFormProps) => {
  const today = getDate();
  const {
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
  } = useDiet(diet, setDiet);

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <ScrollText color="blue" /> Add meal
      </h1>
      <form className="text-black border-0 border-gray-200 w-full">
        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealTime">
          Meal time <Clock color="blue" />
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

        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealName">
          Meal name
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
          Meal calories
          <Flame color="blue" />
        </label>

        <input
          id="mealCalories"
          type="number"
          name="mealCalories"
          placeholder=" Meal calories"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          min={0}
          max={9999}
          value={mealCalories}
          onChange={(e) => setMealCalories(Number(e.target.value))}
        />

        <label className="mb-2 flex gap-2 justify-between" htmlFor="mealDate">
          Meal date <CalendarHeart color="blue" />
        </label>

        <input
          id="mealDate"
          type="date"
          className="w-full border-2 p-0.5 border-gray-200 rounded-xl"
          placeholder=" Meal date"
          value={mealDate}
          onChange={(e) => setMealDate(e.target.value)}
          min={today}
        />
      </form>
      <input
        type="submit"
        onClick={addMeal}
        className={`${
          !isFormValid ? "bg-gray-400 cursor-not-allowed" : ""
        }text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer`}
        value="+ Add plan"
        disabled={!isFormValid}
      />
    </div>
  );
};

export default DietForm;
