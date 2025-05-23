import { ChartNoAxesCombined } from "lucide-react";
import React from "react";

const Stats = () => {
  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 max-w-76 w-full h-fit grow shrink">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <ChartNoAxesCombined color="blue" /> Stats
      </h1>
      <div className="flex flex-col text-xl">
        <p className="text-gray-500 font-medium flex justify-between sm:gap-4 ">
          Calories: <span className="text-black">2200 kcal</span>
        </p>
        <p className="text-gray-500 font-medium flex justify-between  sm:gap-4  ">
          Protein: <span className="text-black">140 g</span>
        </p>
        <p className="text-gray-500 font-medium flex justify-between  sm:gap-4 ">
          Weight: <span className="text-black">68,5 kg</span>
        </p>
      </div>
    </div>
  );
};

export default Stats;
