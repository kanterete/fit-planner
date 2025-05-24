import { CookingPot } from "lucide-react";
import React from "react";
import DietItem from "./DietItem";
import { DietDay } from "@/types/types";
import AddMealButton from "./AddMealButton";
import DietForm from "./DietForm";

type DietListProps = {
  hasDietToday: DietDay | undefined;
};

const DietList = ({ hasDietToday }: DietListProps) => {
  return (
    <div className="flex border-2 border-gray-100 max-w-150 w-full gap-4">
      <div className="border-2 flex flex-col md:flex-row border-gray-100 rounded-xl p-4 max-w-126 w-full gap-4 h-fit justify-between">
        <div className="flex flex-col w-full">
          <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
            <CookingPot color="blue" /> Diet
          </h1>
          {hasDietToday ? (
            <>
              <DietItem hasDietToday={hasDietToday} />
              <AddMealButton />
            </>
          ) : (
            "No diet for today :)"
          )}
        </div>
      </div>
      <DietForm />
    </div>
  );
};

export default DietList;
