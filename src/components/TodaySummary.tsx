import { WeekDay, WorkoutPlan } from "@/types/types";
import { format } from "date-fns";
import React from "react";

type TodaySummaryProps = {
  workoutPlan: WorkoutPlan;
  todayTrainingName: string;
};

const TodaySummary = ({
  workoutPlan,
  todayTrainingName,
}: TodaySummaryProps) => {
  const today = format(new Date(), "EEEE") as WeekDay;
  return (
    <section className="my-4 p-4 md:px-8 mx-auto border-2 w-full bg-primary text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-semibold ">🔥 Today: {today}</h1>
      <span className="text-3xl md:text-4xl font-bold">
        {todayTrainingName}
      </span>
      <span className="text-xl">
        {workoutPlan && (
          <p>
            Active plan: {workoutPlan.name} - {workoutPlan.id}{" "}
          </p>
        )}
      </span>
    </section>
  );
};

export default TodaySummary;
