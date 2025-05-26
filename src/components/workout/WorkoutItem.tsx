import { WorkoutPlan } from "@/types/newTypes";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

type WorkoutItemProps = {
  workout: WorkoutPlan[];
};

const WorkoutItem = ({ workout = [] }: WorkoutItemProps) => {
  if (workout.length === 0) {
    return (
      <span className="text-xl text-gray-400 font-semibold">Rest day 😌</span>
    );
  }

  return (
    <div className="flex flex-col text-xl font-medium w-full justify-between">
      <ol>
        {workout.map((workout) => (
          <li
            key={workout.id}
            className="text-gray-500 flex flex-col sm:flex-row justify-between md:gap-4"
          >
            {workout.name}
            <span className="flex gap-2 items-center">
              <Pencil color="blue" size={20} className="cursor-pointer" />
              <Trash2 color="blue" size={20} className="cursor-pointer" />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkoutItem;
