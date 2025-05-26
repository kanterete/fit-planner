import { TrainingDay } from "@/types/types";
import { DumbbellIcon } from "lucide-react";
import React from "react";
import TrainingItem from "./TrainingItem";

type TrainingListProps = {
  trainingToday?: TrainingDay;
};

const TrainingList = ({ trainingToday }: TrainingListProps) => {
  const exercises = trainingToday?.exercises ?? [];

  return (
    <div className="flex flex-col md:flex-row rounded-xl h-fit w-fit gap-4">
      <div className="border-2 flex flex-col border-gray-100 rounded-xl p-4 max-w-[450px] gap-4 h-fit">
        <div>
          <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
            <DumbbellIcon color="blue" /> Training
          </h1>
          {exercises.length > 0 ? (
            <TrainingItem exercises={exercises} />
          ) : (
            <span className="text-xl text-gray-400 font-semibold">
              Rest day 😌
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingList;
