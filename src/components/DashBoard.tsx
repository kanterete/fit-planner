"use client";
import { useEffect, useState } from "react";
import { getWeekday } from "@/utils/getWeekday";

import { WeekDay, WorkoutPlan } from "@/types/types";
import { testingUser } from "@/data/training";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashBoard = () => {
  const selectedUser = testingUser;

  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [activePlan, setActivePlan] = useState(selectedUser.activePlanId);

  const today = getWeekday();

  const WEEK_DAYS: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const storedWorkouts: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workout") || "[]"
    );
    const storedActivePlan = localStorage.getItem("activePlanId") || "p1";

    if (storedWorkouts.length > 0) {
      setWorkouts(storedWorkouts);
      setActivePlan(storedActivePlan);
      setWorkoutPlan(
        storedWorkouts.find((workout) => workout.id === storedActivePlan)
      );
    } else {
      setWorkouts(selectedUser.workoutPlans);
      setWorkoutPlan(
        selectedUser.workoutPlans.find((workout) => workout.id === activePlan)
      );
    }
  }, [selectedUser, activePlan]);

  const todayTrainingName =
    workoutPlan?.schedule.days[today] ?? "No training for today";

  const todayTraining = workoutPlan?.trainings.find(
    (training) => training.name === todayTrainingName
  );

  return (
    <main className="p-4 mx-auto my-4 container h-fit flex flex-col">
      <section className="my-4 p-4 md:px-8 mx-auto border-2 w-full bg-primary text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-semibold ">
          🔥 Today: {today}
        </h1>
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

      <section className="my-4 p-4 md:px-8 mx-auto border-2 border-gray-100 w-full bg-primary text-white h-fit md:h-40 rounded-xl flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Training exercises list:
        </h1>
        {todayTraining ? (
          <ol>
            {todayTraining.exercises.map((exercise) => (
              <li key={exercise.id}>
                {exercise.name} - {exercise.sets}s x {exercise.reps}r x
                {exercise.weight}kg
              </li>
            ))}
          </ol>
        ) : (
          <p>No exercises for today</p>
        )}
      </section>

      <section className="mb-4">
        <p>Change your plan</p>
        <Select value={activePlan} onValueChange={(val) => setActivePlan(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change your plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {workouts.map((workout) => (
                <SelectItem key={workout.id} value={workout.id}>
                  {workout.name} - {workout.id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      <section className="w-full md:flex-row gap-2 bg-primary border-primary-foreground rounded-xl p-2 md:max-w-82">
        {workoutPlan &&
          WEEK_DAYS.map((day) => {
            const trainingDay = workoutPlan.schedule.days[day] || "Rest";
            return (
              <div
                className="flex justify-between w-full md:max-w-82 y text-muted rounded-xl p-1 items-center px-2 mb-2"
                key={day}
              >
                <p>{day}</p>

                <Select defaultValue={trainingDay}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Change a training?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Trainings</SelectLabel>
                      <SelectItem value="Rest">Rest</SelectItem>
                      {workoutPlan.trainings.map((training) => (
                        <SelectItem key={training.id} value={training.name}>
                          {training.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default DashBoard;
