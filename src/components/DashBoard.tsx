"use client";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import { getDate } from "@/utils/getDate";
import DietList from "./diet/DietList";
import DateBar from "./DateBar";
import { DietDay } from "@/types/types";
import { getWeekday } from "@/utils/getWeekday";
import { dummyWeeklySchedule, dummyWorkoutPlan } from "@/data/training";
import TrainingList from "./training/TrainingList";
import { WorkoutPlan } from "@/types/newTypes";

const DashBoard = () => {
  const [workout, setWorkout] = useState<WorkoutPlan[]>([]);

  const today = getDate();
  const weekday = getWeekday();

  const activePlan = workout.find(
    (plan) => plan.id === dummyWeeklySchedule.planId
  );

  const todayTrainingName = dummyWeeklySchedule.days[weekday];

  const todayTraining = activePlan?.trainings.find(
    (training) => training.name === todayTrainingName
  );

  const [diet, setDiet] = useState<DietDay[]>([]);

  useEffect(() => {
    const stored: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workout") || "[]"
    );

    if (stored.length > 0) setWorkout(stored);
    else setWorkout(dummyWorkoutPlan);

    //load diets from storage
    const storedDiet = localStorage.getItem("diet");
    if (storedDiet) {
      const parsed: Record<string, DietDay> = JSON.parse(storedDiet);
      const values = Object.values(parsed);
      setDiet(values);
    }
  }, []);

  const dietToday = diet.find((diet) => diet.date === today);
  const caloriesToday = dietToday
    ? dietToday.meals.reduce((total, meal) => total + meal.calories, 0)
    : 0;

  return (
    <main className="p-4 mx-auto my-4 max-w-[1240px] h-fit flex flex-col">
      <DateBar weekday={weekday} todayTrainingName={todayTrainingName} />
      <section className="flex w-full flex-wrap md:flex-row gap-2">
        <Stats caloriesToday={caloriesToday} />
        <DietList dietToday={dietToday} />
        <TrainingList todayTraining={todayTraining} />
      </section>
    </main>
  );
};

export default DashBoard;
