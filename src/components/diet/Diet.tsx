"use client";
import React, { useEffect, useState } from "react";
import DietList from "./DietList";
import DietForm from "./DietForm";
import { DietDay } from "@/types/oldTypes";
import { getDate } from "@/utils/getDate";

const Diet = () => {
  const today = getDate();
  const [diet, setDiet] = useState<DietDay[]>([]);

  useEffect(() => {
    const storedDiet = localStorage.getItem("diet");
    if (storedDiet) {
      const parsed: Record<string, DietDay> = JSON.parse(storedDiet);
      const values = Object.values(parsed);
      setDiet(values);
    }
  }, []);

  const dietToday = diet.find((diet) => diet.date === today);
  return (
    <>
      <DietList dietToday={dietToday} />
      <DietForm diet={diet} setDiet={setDiet} />
    </>
  );
};

export default Diet;
