"use client";
import { WorkoutPlan } from "@/types/newTypes";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type WorkoutSelectProps = {
  workout: WorkoutPlan[];
};

const WorkoutSelect = ({ workout }: WorkoutSelectProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  const selectedWorkout = workout.find(
    (workout) => workout.id === selectedPlanId
  );

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit font-semibold">
      <div className="relative inline-block">
        <select
          className="p-2 border-gray-200 border rounded-xl appearance-none w-full mb-2"
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(e.target.value)}
        >
          <option value="" disabled hidden>
            Select your plan
          </option>
          {(workout || []).map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
          <ChevronDown size={20} />
        </div>
      </div>

      {selectedWorkout && (
        <div className="flex gap-6 flex-wrap">
          {selectedWorkout.trainings.map((trainings, index) => (
            <div key={index} className="w-full">
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {trainings.name}
              </h2>
              {trainings.exercises.length > 0 ? (
                <ol className="list-disc pl-6 text-gray-700">
                  {trainings.exercises.map((exercise) => (
                    <li key={exercise.id}>{exercise.name}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No exercises for this day
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutSelect;
