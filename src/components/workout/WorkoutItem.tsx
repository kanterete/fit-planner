import { WorkoutPlan } from "@/types/newTypes";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

type WorkoutItemProps = {
  workout: WorkoutPlan[];
  removePlan: (id: string) => void;
};

const WorkoutItem = ({ workout = [], removePlan }: WorkoutItemProps) => {
  if (workout.length === 0) {
    return (
      <span className="text-xl text-gray-400 font-semibold">Rest day 😌</span>
    );
  }

  return (
    <div className="flex flex-col text-xl font-medium w-full">
      <ol className="flex flex-col">
        {workout.map((workout) => (
          <li key={workout.id} className="text-black flex flex-col mb-2">
            <div className="flex justify-between">
              {workout.name}
              <span className="flex gap-2 items-center">
                <Pencil color="blue" size={20} className="cursor-pointer" />
                <Trash2
                  color="blue"
                  size={20}
                  className="cursor-pointer"
                  onClick={() => removePlan(workout.id)}
                />
              </span>
            </div>
            <ol>
              {workout.trainings.map((training, index) => (
                <li key={index} className="text-gray-500">
                  - {training.name}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkoutItem;
