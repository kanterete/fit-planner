import { CookingPot } from "lucide-react";
import React from "react";
import DietItem from "./DietItem";
import { DietDay } from "@/types/types";
import AddMealButton from "./AddMealButton";

type DietListProps = {
  hasDietToday: DietDay | undefined;
};

const DietList = ({ hasDietToday }: DietListProps) => {
  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 max-w-86 w-full h-fit grow shrink">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <CookingPot color="blue" /> Diet
      </h1>
      <DietItem hasDietToday={hasDietToday} />
      <AddMealButton />
    </div>
  );
};

export default DietList;
