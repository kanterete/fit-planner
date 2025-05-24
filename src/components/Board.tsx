"use client";
import { useEffect, useState } from "react";
import CurrentDate from "./CurrentDate";
import Stats from "./Stats";
import TrainingList from "./TrainingList";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { trainingData } from "@/data/training";
import DietList from "./DietList";
import { dietData } from "@/data/diet";

const Board = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(getFormattedDate());
  }, []);

  const hasTrainingToday = trainingData.find(
    (trainDay) => trainDay.date === today
  );

  const hasDietToday = dietData.find((diet) => diet.date === today);

  return (
    <div className="p-4 mx-auto my-4 max-w-[1240px] h-fit flex flex-col">
      <CurrentDate today={today} hasTrainingToday={hasTrainingToday} />
      <div className="flex w-full flex-wrap md:flex-row gap-4 border-gray-100 border-2">
        <Stats />
        <DietList hasDietToday={hasDietToday} />
        <TrainingList hasTrainingToday={hasTrainingToday} />
      </div>
    </div>
  );
};

export default Board;
