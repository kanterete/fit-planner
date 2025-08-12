import { DumbbellIcon } from "lucide-react";
import React from "react";
import WorkoutItem from "./WorkoutItem";
import { WorkoutPlan } from "@/types/newTypes";

type WorkoutListProps = {
  workout: WorkoutPlan[];
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>;
};

const WorkoutList = ({ workout, setWorkout }: WorkoutListProps) => {
  const removePlan = (id: string) => {
    const updated = workout.filter((plan) => plan.id !== id);
    setWorkout(updated);
    localStorage.setItem("workout", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col md:flex-row rounded-xl h-fit w-fit gap-4">
      <div className="border-2 flex flex-col border-gray-100 rounded-xl p-4 max-w-[850px] gap-4 h-fit">
        <div>
          <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
            <DumbbellIcon color="blue" /> Workout plans
          </h1>
          <WorkoutItem workout={workout} removePlan={removePlan} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutList;
