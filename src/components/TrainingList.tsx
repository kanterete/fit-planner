import { TrainingDay } from "@/types/types";
import { DumbbellIcon } from "lucide-react";
import React from "react";

type TrainingListProps = {
  hasTrainingToday: TrainingDay | undefined;
};

const TrainingList = ({ hasTrainingToday }: TrainingListProps) => {
  const exercises = hasTrainingToday?.exercises ?? [];

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 h-fit w-fit grow shrink">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <DumbbellIcon color="blue" /> Training
      </h1>
      <div className="flex flex-col text-xl font-medium w-full justify-between">
        {exercises.length > 0 ? (
          exercises.map(({ name, sets, reps, weight }, id) => (
            <p
              key={id}
              className="text-gray-500 flex flex-col sm:flex-row justify-between md:gap-4"
            >
              {name}{" "}
              <span className="text-black">
                {sets}x{reps} - {weight} kg
              </span>
            </p>
          ))
        ) : (
          <span className="text-gray-400">Rest day 😌</span>
        )}
      </div>
    </div>
  );
};

export default TrainingList;
