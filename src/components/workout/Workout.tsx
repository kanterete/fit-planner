"use client";
import React, { useEffect, useState } from "react";
import WorkoutList from "./WorkoutList";
import WorkoutForm from "./WorkoutForm";
import { WorkoutPlan } from "@/types/newTypes";
import { dummyWorkoutPlan } from "@/data/newTraining";
const Workout = () => {
  const [workout, setWorkout] = useState<WorkoutPlan[]>([]);

  useEffect(() => {
    setWorkout(dummyWorkoutPlan);
  }, []);

  return (
    <>
      <WorkoutList workout={workout} />
      <WorkoutForm setWorkout={setWorkout} />
    </>
  );
};

export default Workout;
