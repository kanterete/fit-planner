"use client";
import React, { useEffect, useState } from "react";
import TrainingList from "./TrainingList";
import TrainingForm from "./TrainingForm";
import { getDate } from "@/utils/getDate";
import { useTraining } from "@/hooks/useTraining";
import { TrainingDay } from "@/types/types";

const Training = () => {
  const today = getDate();

  const { training, setTraining } = useTraining();
  const trainingToday = training.find((training) => training.date === today);

  useEffect(() => {
    const stored = localStorage.getItem("training");
    if (stored) {
      const parsed: Record<string, TrainingDay> = JSON.parse(stored);
      setTraining(Object.values(parsed));
    }
  }, []);

  return (
    <>
      <TrainingList trainingToday={trainingToday} />
      <TrainingForm />
    </>
  );
};

export default Training;
