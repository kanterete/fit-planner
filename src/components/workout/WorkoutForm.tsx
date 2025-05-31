"use client";
import { WorkoutPlan } from "@/types/newTypes";
import { NotebookPen, Pen } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type WorkoutFormProps = {
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>;
};

const WorkoutForm = ({ setWorkout }: WorkoutFormProps) => {
  const [workoutName, setWorkoutName] = useState<string>("");

  const clearForm = () => {
    setWorkoutName("");
  };

  const addWorkout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workoutName.trim()) return toast("Fill up the input!");

    const newWorkout: WorkoutPlan = {
      id: "plan-" + uuidv4(),
      name: workoutName,
      trainings: [],
    };

    try {
      const stored: WorkoutPlan[] = JSON.parse(
        localStorage.getItem("workout") || "[]"
      );

      const updated = Array.isArray(stored)
        ? [...stored, newWorkout]
        : [newWorkout];

      localStorage.setItem("workout", JSON.stringify(updated));
      setWorkout(updated);
      toast("New Workout plan added!");
      clearForm();
    } catch (error) {
      console.error("Failed to save workout:", error);
      toast("Error saving workout plan.");
    }
  };

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <NotebookPen color="blue" /> Add workout
      </h1>
      <form
        onSubmit={addWorkout}
        className="text-black border-0 border-gray-200 w-full"
      >
        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="workoutName"
        >
          Workout name
          <Pen color="blue" />
        </label>

        <input
          id="workoutName"
          type="text"
          name="workoutName"
          placeholder=" Push day - Type A"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />

        <input
          type="submit"
          className={`${
            !workoutName.trim() ? "bg-gray-400 cursor-not-allowed" : ""
          }text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold`}
          value="+ Add plan"
          disabled={!workoutName.trim()}
        />
      </form>
    </div>
  );
};

export default WorkoutForm;
