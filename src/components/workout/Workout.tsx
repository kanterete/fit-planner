"use client";
import React, { useEffect, useState } from "react";
import { WorkoutPlan } from "@/types/newTypes";
import { dummyWorkoutPlan } from "@/data/training";
import WorkoutSelect from "./WorkoutSelect";
import ExerciseForm from "./ExerciseForm";
const Workout = () => {
  const [workout, setWorkout] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    const stored: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workout") || "[]"
    );

    if (stored.length > 0) setWorkout(stored);
    else setWorkout(dummyWorkoutPlan);
  }, []);

  return (
    <>
      <WorkoutSelect workout={workout} setWorkout={setWorkout} />
      <ExerciseForm workout={workout} setWorkout={setWorkout} />
    </>
  );
};

export default Workout;
