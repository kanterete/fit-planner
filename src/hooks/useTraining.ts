"use client";
import { TrainingDay } from "@/types/types";
import { getDate } from "@/utils/getDate";
import { useState } from "react";
import { toast } from "sonner";

export function useTraining() {
  const today = getDate();
  const [training, setTraining] = useState<TrainingDay[]>([]);

  const [trainingDate, setTrainingDate] = useState(today);
  const [trainingName, setTrainingName] = useState("");

  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState<number>(1);
  const [exerciseReps, setExerciseReps] = useState<number>(1);
  const [exerciseWeight, setExerciseWeight] = useState<number>(1);

  const resetForm = () => {
    setExerciseName("");
    setTrainingName("");
    setTrainingDate(today);
    setExerciseReps(1);
    setExerciseSets(1);
    setExerciseWeight(1);
  };

  const addTraining = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !trainingName.trim() ||
      !exerciseName.trim() ||
      exerciseSets < 1 ||
      exerciseReps < 1 ||
      exerciseWeight < 1
    )
      return;

    //Get item from storage
    const stored = localStorage.getItem("training");
    const parsed: Record<string, TrainingDay> = stored
      ? JSON.parse(stored)
      : {};

    //If training for this day doesn't exist, create one
    if (!parsed[trainingDate]) {
      parsed[trainingDate] = {
        id: Date.now(),
        name: trainingName,
        date: trainingDate,
        exercises: [],
      };
    } else {
      toast("This training already exists");
    }

    //read training for today
    const exercise = parsed[trainingDate].exercises;
    const existingExercise = exercise.find(
      (ex) =>
        ex.name.toLowerCase().trim() === exerciseName.toLowerCase().trim() &&
        ex.reps === exerciseReps &&
        ex.sets === exerciseSets &&
        ex.weight === exerciseWeight
    );

    if (!existingExercise) {
      exercise.push({
        name: exerciseName,
        sets: exerciseSets,
        reps: exerciseReps,
        weight: exerciseWeight,
      });
    } else toast("This exercise already exists");

    localStorage.setItem("training", JSON.stringify(parsed));

    resetForm();
  };
  return {
    addTraining,
    trainingDate,
    setTrainingDate,
    trainingName,
    setTrainingName,
    exerciseName,
    setExerciseName,
    exerciseReps,
    setExerciseReps,
    exerciseSets,
    setExerciseSets,
    exerciseWeight,
    setExerciseWeight,
    training,
    setTraining,
  };
}
