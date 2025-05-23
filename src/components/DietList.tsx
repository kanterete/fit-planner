import { CookingPot } from "lucide-react";
import React from "react";
import DietItem from "./DietItem";
import { DietDay } from "@/types/types";
type DietListProps = {
  hasDietToday: DietDay | undefined;
};

const DietList = ({ hasDietToday }: DietListProps) => {
  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 max-w-76 w-full h-fit grow shrink">
      <h1 className="font-bold flex gap-5 items-center mb-2 text-2xl">
        <CookingPot color="blue" /> Diet
      </h1>
      <div className="flex flex-col text-xl"></div>
    </div>
  );
};

export default DietList;
