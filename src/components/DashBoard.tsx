"use client";
import { useEffect, useState } from "react";
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

import { startOfWeek, addDays, format } from "date-fns";

const DashBoard = () => {
  const selectedUser = testingUser;

  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [activePlan, setActivePlan] = useState(selectedUser.activePlanId);

  const [weekdaySelections, setWeekdaySelections] = useState<
    Partial<Record<WeekDay, string>>
  >({});

  const today = format(new Date(), "EEEE") as WeekDay;

  const getCurrentWeekDays = () => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = [...Array(7)].map((_, i) => {
      const date = addDays(monday, i);
      return {
        name: format(date, "EEEE") as WeekDay,
        short: format(date, "EE"),
        day: format(date, "dd"),
        date: format(date, "dd.MM.yy"),
        fullDate: date,
      };
    });
    return days;
  };

  const currentWeek = getCurrentWeekDays();

  const todayTrainingName =
    workoutPlan?.schedule.days[today] ?? "No training for today";

  const todayTraining = workoutPlan?.trainings.find(
    (training) => training.name === todayTrainingName
  );

  useEffect(() => {
    const storedWorkouts: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workouts") || "[]"
    );
    const storedActivePlan = localStorage.getItem("activePlanId") || "p1";

    if (storedWorkouts.length > 0) {
      setWorkouts(storedWorkouts);
      setActivePlan(storedActivePlan);
      setWorkoutPlan(
        storedWorkouts.find((workout) => workout.id === storedActivePlan)
      );
    } else {
      const defaultWorkouts = selectedUser.workoutPlans;
      const defaultActivePlan = selectedUser.activePlanId;
      const defaultPlan = defaultWorkouts.find(
        (plan) => plan.id === defaultActivePlan
      );

      localStorage.setItem("workouts", JSON.stringify(defaultWorkouts));
      localStorage.setItem("activePlanId", defaultActivePlan ?? "p1");
      localStorage.setItem("workoutPlan", JSON.stringify(defaultPlan));

      setWorkouts(defaultWorkouts);
      setActivePlan(defaultActivePlan);
      setWorkoutPlan(defaultPlan);
    }
  }, [selectedUser, activePlan]);

  useEffect(() => {
    if (workoutPlan) {
      setWeekdaySelections({ ...workoutPlan.schedule.days });
    }
  }, [workoutPlan]);

  const handleActivePlanChange = (val: string) => {
    localStorage.setItem("activePlanId", val);
    setActivePlan(val);

    const newPlan = workouts.find((workout) => workout.id === val);

    localStorage.setItem("workoutPlan", JSON.stringify(newPlan));
  };

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
        <Select
          value={activePlan}
          onValueChange={(val) => {
            handleActivePlanChange(val);
          }}
        >
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

      <section className="flex flex-col md:flex-row w-full gap-2 rounded-xl p-2 ">
        {workoutPlan &&
          currentWeek.map((day, index) => {
            return (
              <div
                className={`flex flex-col w-full bg-accent text-black rounded-xl p-6 items-center px-2 mb-2 ${
                  day.name === today
                    ? "bg-primary text-white"
                    : "bg-accent text-black"
                }`}
                key={index}
              >
                <p className="text-2xl mb-2">{day.name}</p>
                <p className="text-4xl mb-4">{day.day}</p>
                <div className="">
                  <Select
                    value={weekdaySelections[day.name]}
                    onValueChange={(val) => {
                      setWeekdaySelections((prev) => ({
                        ...prev,
                        [day.name]: val,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Change a training?" />
                    </SelectTrigger>
                    <SelectContent className="">
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
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default DashBoard;
