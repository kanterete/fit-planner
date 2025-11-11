"use client";
import { useEffect, useState } from "react";
import { Training, WeekDay, WorkoutPlan } from "@/types/types";
import { legs, push, testingUser } from "@/data/training";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";

import Calendar from "./Calendar";
import Exercises from "./Exercises";
import TodaySummary from "./TodaySummary";
import CustomTrainingForm from "./CustomTrainingForm";
import { Minus } from "lucide-react";
import { Button } from "./ui/button";

const DashBoard = () => {
  const selectedUser = testingUser;

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [activePlan, setActivePlan] = useState(selectedUser.activePlanId);
  const [weekdaySelections, setWeekdaySelections] = useState<
    Partial<Record<WeekDay, string>>
  >({});

  const today = format(new Date(), "EEEE") as WeekDay;

  const todayTrainingName =
    workoutPlan?.schedule.days[today] ?? "No training for today";

  const todaysTraining = workoutPlan?.trainings.find(
    (training) => training.name === todayTrainingName
  ) ?? { id: "", name: "", exercises: [] };

  useEffect(() => {
    const storedTrainings: Training[] = JSON.parse(
      localStorage.getItem("trainings") || "[]"
    );

    const storedWorkouts: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workouts") || "[]"
    );
    const storedActivePlan = localStorage.getItem("activePlanId") || "p1";

    if (
      storedWorkouts.length > 0 &&
      storedTrainings.length > 0 &&
      storedActivePlan != null
    ) {
      setTrainings(storedTrainings);
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
      const defaultTrainings = [push, legs];

      localStorage.setItem("workouts", JSON.stringify(defaultWorkouts));
      localStorage.setItem("activePlanId", defaultActivePlan ?? "p1");
      localStorage.setItem("workoutPlan", JSON.stringify(defaultPlan));
      localStorage.setItem("trainings", JSON.stringify(defaultTrainings));

      setWorkouts(defaultWorkouts);
      setActivePlan(defaultActivePlan);
      setWorkoutPlan(defaultPlan);
      setTrainings(defaultTrainings);
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

  const handleScheduleChange = (val: string, day: WeekDay, id: string) => {
    const plan: WorkoutPlan = JSON.parse(localStorage.getItem("workoutPlan")!);
    const workouts: WorkoutPlan[] = JSON.parse(
      localStorage.getItem("workouts")!
    );

    const updatedPlan = {
      ...plan,
      schedule: {
        ...plan.schedule,
        days: {
          ...plan.schedule.days,
          [day]: val,
        },
      },
    };

    const updatedWorkouts = workouts.map((plan) =>
      plan.id === id ? updatedPlan : plan
    );

    localStorage.setItem("workoutPlan", JSON.stringify(updatedPlan));
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

    setWeekdaySelections((prev) => ({
      ...prev,
      [day]: val,
    }));

    setWorkouts(updatedWorkouts);
    setWorkoutPlan(updatedPlan);
  };

  const handleExerciseDelete = (trainingId: string, exerciseId: string) => {
    const newTrainings = trainings.map((t) =>
      t.id === trainingId
        ? { ...t, exercises: t.exercises.filter((ex) => ex.id !== exerciseId) }
        : t
    );

    const filtered = newTrainings.filter((t) => t.exercises.length > 0);

    setTrainings(filtered);
    localStorage.setItem("trainings", JSON.stringify(filtered));
  };

  return (
    <main className="p-4 mx-auto my-4 container h-fit flex flex-col">
      <TodaySummary
        workoutPlan={workoutPlan!}
        todayTrainingName={todayTrainingName}
      />

      <section className="flex flex-col lg:flex-row gap-4 mb-8">
        <div>
          <Exercises todaysTraining={todaysTraining} />
          <section className="mb-4 p-2">
            <p>Change your plan</p>
            <Select
              value={activePlan}
              onValueChange={(val) => {
                handleActivePlanChange(val);
              }}
            >
              <SelectTrigger className="w-full">
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
        </div>

        <section className="my-4 p-4 md:px-8 border-2 md:max-w-80 border-gray-100 bg-primary text-white h-fit rounded-xl flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Trainings list:
          </h1>
          {trainings.map((t) => (
            <div key={t.id}>
              <p className="font-semibold">{t.name}</p>
              <ol className="ml-4">
                {t.exercises.map((ex) => (
                  <li key={ex.id}>
                    {ex.name} - {ex.reps}r x {ex.sets}s x {ex.weight}kg
                    <Button
                      className=" bg-red-600 size-0.5 text-white"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExerciseDelete(t.id, ex.id);
                      }}
                    >
                      <Minus />
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
        <CustomTrainingForm trainings={trainings} setTrainings={setTrainings} />
      </section>

      <Calendar
        workoutPlan={workoutPlan!}
        handleScheduleChange={handleScheduleChange}
        weekdaySelections={weekdaySelections}
      />
    </main>
  );
};

export default DashBoard;
