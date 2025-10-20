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

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      plan.id === id
        ? {
            ...plan,
            schedule: {
              ...plan.schedule,
              days: {
                ...plan.schedule.days,
                [day]: val,
              },
            },
          }
        : plan
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

      <Carousel className="md:w-full">
        <CarouselContent>
          {workoutPlan &&
            currentWeek.map((day, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div>
                  <Card
                    className={`${
                      day.name === today
                        ? "bg-primary text-white"
                        : "bg-accent text-black"
                    }`}
                  >
                    <CardContent>
                      <p className="text-xl mb-2">{day.name}</p>
                      <p className="text-5xl mb-4">{day.day}</p>
                      <div className="">
                        <Select
                          value={weekdaySelections[day.name]}
                          onValueChange={(val) =>
                            handleScheduleChange(val, day.name, workoutPlan.id)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Change?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Trainings</SelectLabel>
                              <SelectItem value="Rest">Rest</SelectItem>
                              {workoutPlan.trainings.map((training) => (
                                <SelectItem
                                  key={training.id}
                                  value={training.name}
                                >
                                  {training.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
};

export default DashBoard;
