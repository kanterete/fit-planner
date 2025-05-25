"use client";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import TrainingList from "./Training/TrainingList";
import { getFormattedDate } from "@/utils/getFormattedDate";
import DietList from "./Diet/DietList";
import DateBar from "./DateBar";
import { DietDay, TrainingDay } from "@/types/types";

const DashBoard = () => {
  const [today, setToday] = useState("");
  const [diet, setDiet] = useState<DietDay[]>([]);
  const [training, setTraining] = useState<TrainingDay[]>([]);

  useEffect(() => {
    //load trainings from storage
    const storedTraining = localStorage.getItem("training");
    if (storedTraining) {
      const parsed: Record<string, TrainingDay> = JSON.parse(storedTraining);
      const values = Object.values(parsed);
      setTraining(values);
    }
    //load diets from storage
    const storedDiet = localStorage.getItem("diet");
    if (storedDiet) {
      const parsed: Record<string, DietDay> = JSON.parse(storedDiet);
      const values = Object.values(parsed);
      setDiet(values);
    }

    //set date
    setToday(getFormattedDate());
  }, []);

  const trainingToday = training.find((training) => training.date === today);
  const dietToday = diet.find((diet) => diet.date === today);
  const caloriesToday = dietToday
    ? dietToday.meals.reduce((total, meal) => total + meal.calories, 0)
    : 0;

  return (
    <main className="p-4 mx-auto my-4 max-w-[1240px] h-fit flex flex-col">
      <DateBar today={today} trainingToday={trainingToday} />
      <section className="flex w-full flex-wrap md:flex-row gap-2">
        <Stats caloriesToday={caloriesToday} />
        <DietList dietToday={dietToday} />
        <TrainingList trainingToday={trainingToday} />
      </section>
    </main>
  );
};

export default DashBoard;
