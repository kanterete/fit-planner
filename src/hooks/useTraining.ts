"use client";

import { WorkoutPlan } from "@/types/newTypes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useTraining() {
  const [workout, setWorkout] = useState<WorkoutPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedWorkoutName, setSelectedWorkoutName] = useState<string>("");

  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState(1);
  const [exerciseReps, setExerciseReps] = useState(1);
  const [exerciseWeight, setExerciseWeight] = useState(1);

  const selectedWorkout = workout.find(
    (workout) => workout.id === selectedPlanId
  );

  const resetForm = () => {
    setExerciseName("");
    setExerciseReps(1);
    setExerciseSets(1);
    setExerciseWeight(1);
  };

  const addExercise = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !exerciseName.trim() ||
      !selectedWorkout ||
      !selectedPlanId ||
      !exerciseSets ||
      !exerciseReps ||
      !exerciseWeight
    )
      return;

    const newExercise = {
      id: "exercise-" + uuidv4(),
      name: exerciseName,
      sets: exerciseSets,
      reps: exerciseReps,
      weight: exerciseWeight,
    };

    const updatedWorkout = { ...selectedWorkout };

    const training = updatedWorkout.trainings.find(
      (t) => t.name === selectedWorkoutName
    );

    if (!training) return;

    training.exercises.push(newExercise);

    const existingPlans = JSON.parse(localStorage.getItem("workout") || "[]");

    const updatedPlans = existingPlans.map((plan: WorkoutPlan) =>
      plan.id === selectedPlanId ? updatedWorkout : plan
    );

    localStorage.setItem("workout", JSON.stringify(updatedPlans));

    setWorkout((prev) =>
      prev.map((plan) => (plan.id === selectedPlanId ? updatedWorkout : plan))
    );

    resetForm();
  };
  return {
    workout,
    setWorkout,
    selectedPlanId,
    setSelectedPlanId,
    selectedWorkoutName,
    setSelectedWorkoutName,
    exerciseName,
    setExerciseName,
    exerciseReps,
    setExerciseReps,
    exerciseSets,
    setExerciseSets,
    exerciseWeight,
    setExerciseWeight,
    addExercise,
  };
}
