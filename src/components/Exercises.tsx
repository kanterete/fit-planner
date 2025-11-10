import { Training } from "@/types/types";
import React from "react";

type ExercisesProps = {
  todaysTraining: Training;
};

const Exercises = ({ todaysTraining }: ExercisesProps) => {
  return (
    <section className="my-4 p-4 md:px-8 mx-auto border-2 border-gray-100 w-full bg-primary text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Training exercises list:
      </h1>
      {todaysTraining ? (
        <ol>
          {todaysTraining.exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name} - {exercise.reps}r x {exercise.sets}s x{" "}
              {exercise.weight}kg
            </li>
          ))}
        </ol>
      ) : (
        <p>No exercises for today</p>
      )}
    </section>
  );
};

export default Exercises;
