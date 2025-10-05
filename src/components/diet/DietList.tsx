"use client";

import { CookingPot } from "lucide-react";
import React from "react";
import DietItem from "./DietItem";
import { DietDay } from "@/types/oldTypes";

type DietListProps = {
  dietToday?: DietDay;
};

const DietList = ({ dietToday }: DietListProps) => {
  const meals = dietToday?.meals ?? [];
  const mealsOrder = ["Breakfast", "Lunch", "Dinner"];
  const sortedMeals = meals.sort(
    (a, b) => mealsOrder.indexOf(a.time) - mealsOrder.indexOf(b.time)
  );

  return (
    <div className="flex flex-col sm:flex-row max-w-[350px] w-full gap-4 grow shrink">
      <div className="border-2 flex flex-col border-gray-100 rounded-xl p-4 max-w-126 w-full gap-4 h-fit items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
            <CookingPot color="blue" /> Diet
          </h1>
          <DietItem meals={sortedMeals} />
        </div>
      </div>
    </div>
  );
};

export default DietList;
