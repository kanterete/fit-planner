"use client";
import { useExerciseForm } from "@/hooks/useExerciseForm";
import { WorkoutPlan } from "@/types/newTypes";
import { ChevronDown, NotebookPen, Pen, Repeat, Weight, X } from "lucide-react";
import React from "react";

type ExerciseFormProps = {
  workout: WorkoutPlan[];
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>;
};

const ExerciseForm = ({ workout, setWorkout }: ExerciseFormProps) => {
  const {
    selectedPlanId,
    setSelectedPlanId,
    selectedWorkoutName,
    setSelectedWorkoutName,
    exerciseName,
    setExerciseName,
    exerciseSets,
    setExerciseSets,
    exerciseReps,
    setExerciseReps,
    exerciseWeight,
    setExerciseWeight,
    selectedWorkout,
    addExercise,
    isFormValid,
  } = useExerciseForm(workout, setWorkout);

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <NotebookPen color="blue" /> Add exercise
      </h1>
      <form className="text-black border-0 border-gray-200 w-full font-semibold">
        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="exerciseName"
        >
          Exercise name
          <Pen color="blue" />
        </label>

        <input
          id="exerciseName"
          type="text"
          name="exerciseName"
          placeholder=" Bench Press"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />

        <label className="mb-2 flex gap-2 justify-between" htmlFor="selectDay">
          Plan day
          <Pen color="blue" />
        </label>

        <div className="relative inline-block w-full mb-2">
          <select
            id="selectDay"
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

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="trainingDay"
        >
          Training day
          <Pen color="blue" />
        </label>

        <div className="relative inline-block w-full mb-2">
          <select
            id="trainingDay"
            className="p-2 border-gray-200 border rounded-xl appearance-none w-full mb-2"
            value={selectedWorkoutName}
            onChange={(e) => setSelectedWorkoutName(e.target.value)}
          >
            <option value="" disabled hidden>
              Select your training day
            </option>
            {(selectedWorkout?.trainings || []).map((training, index) => (
              <option key={index} value={training.name}>
                {training.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
            <ChevronDown size={20} />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <div>
            <label
              htmlFor="exerciseSets"
              className="flex gap-2 justify-center mb-2"
            >
              Sets <X color="blue" />
            </label>

            <input
              id="exerciseSets"
              type="number"
              name="exerciseSets"
              min={1}
              max={99}
              placeholder=" 3"
              className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
              value={exerciseSets}
              onChange={(e) => setExerciseSets(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="exerciseReps"
              className="flex gap-2 justify-center mb-2"
            >
              Reps <Repeat color="blue" />
            </label>
            <input
              id="exerciseReps"
              type="number"
              name="exerciseReps"
              min={1}
              max={99}
              placeholder=" 8"
              className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
              value={exerciseReps}
              onChange={(e) => setExerciseReps(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="exerciseWeight"
              className="flex gap-2 justify-center mb-2"
            >
              Weight <Weight color="blue" />
            </label>
            <input
              id="exerciseWeight"
              type="number"
              name="exerciseWeight"
              min={1}
              max={999}
              placeholder=" 40kg"
              className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
              value={exerciseWeight}
              onChange={(e) => setExerciseWeight(Number(e.target.value))}
            />
          </div>
        </div>

        <input
          type="submit"
          onClick={addExercise}
          className={`${
            !isFormValid ? "bg-gray-400 cursor-not-allowed" : ""
          }text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold cursor-pointer`}
          value="+ Add plan"
          disabled={!isFormValid}
        />
      </form>
    </div>
  );
};

export default ExerciseForm;
