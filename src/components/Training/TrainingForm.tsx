"use client";
import { getFormattedDate } from "@/utils/getFormattedDate";
import {
  Asterisk,
  CalendarHeart,
  NotebookPen,
  Pen,
  Repeat,
  Weight,
} from "lucide-react";
import React, { useState } from "react";
import TrainingButton from "./TrainingButton";
import { TrainingDay } from "@/types/types";

const TrainingForm = () => {
  const today = getFormattedDate();
  const [trainingDate, setTrainingDate] = useState(today);
  const [trainingName, setTrainingName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState<number>(1);
  const [exerciseReps, setExerciseReps] = useState<number>(1);
  const [exerciseWeight, setExerciseWeight] = useState<number>(1);

  const collectData = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !trainingName ||
      !exerciseName ||
      exerciseSets === null ||
      exerciseReps === null ||
      exerciseWeight === null
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
      alert("training already exists");
    }

    //read training for today
    const exercise = parsed[trainingDate].exercises;
    const existingExerciseName = exercise.find(
      (ex) => ex.name === trainingName
    );
    const existingExerciseReps = exercise.find(
      (ex) => ex.reps === exerciseReps
    );
    const existingExerciseSets = exercise.find(
      (ex) => ex.sets === exerciseSets
    );
    const existingExerciseWeight = exercise.find(
      (ex) => ex.sets === exerciseWeight
    );

    if (
      !existingExerciseName &&
      !existingExerciseReps &&
      !existingExerciseSets &&
      !existingExerciseWeight
    ) {
      exercise.push({
        name: exerciseName,
        sets: exerciseSets,
        reps: exerciseReps,
        weight: exerciseWeight,
      });
    } else alert("exercise already existing");

    localStorage.setItem("training", JSON.stringify(parsed));

    //Clearing
    setExerciseName("");
    setTrainingName("");
    setExerciseReps(1);
    setExerciseSets(1);
  };

  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <NotebookPen color="blue" /> Add workout
      </h1>
      <form className="text-black border-0 border-gray-200 w-full">
        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="trainingName"
        >
          Training name
          <Pen color="blue" />
        </label>

        <input
          id="trainingName"
          type="text"
          name="trainingName"
          placeholder=" Push day - Type A"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          value={trainingName}
          onChange={(e) => setTrainingName(e.target.value)}
        />

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

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="exerciseSets"
        >
          Sets <Asterisk color="blue" />
        </label>

        <input
          id="exerciseSets"
          type="number"
          name="exerciseSets"
          placeholder=" training sets"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          min={0}
          max={9999}
          value={exerciseSets}
          onChange={(e) => setExerciseSets(Number(e.target.value))}
        />

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="exerciseReps"
        >
          Reps <Repeat color="blue" />
        </label>

        <input
          id="exerciseReps"
          type="number"
          name="exerciseReps"
          placeholder=" exercise reps"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          min={1}
          max={9999}
          value={exerciseReps}
          onChange={(e) => setExerciseReps(Number(e.target.value))}
        />

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="exerciseWeight"
        >
          Weight <Weight color="blue" />
        </label>

        <input
          id="exerciseWeight"
          type="number"
          name="exerciseWeight"
          placeholder=" exercise weight"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
          min={1}
          max={9999}
          value={exerciseWeight}
          onChange={(e) => setExerciseWeight(Number(e.target.value))}
        />

        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="trainingDate"
        >
          Training date <CalendarHeart color="blue" />
        </label>

        <input
          id="trainingDate"
          type="date"
          className="w-full border-2 p-0.5 border-gray-200 rounded-xl"
          placeholder=" training date"
          value={trainingDate}
          onChange={(e) => setTrainingDate(e.target.value)}
          min={today}
        />
      </form>
      <TrainingButton collectData={collectData} />
    </div>
  );
};

export default TrainingForm;
