import { User, WorkoutPlan } from "@/types/types";
import { DailyTrainingAssignment, Training } from "@/types/types";

export const push: Training = {
  id: "t1",
  name: "Push",
  exercises: [
    { id: "e1", name: "Bench Press", sets: 5, reps: 5, weight: 100 },
    { id: "e2", name: "Overhead Press", sets: 3, reps: 8, weight: 60 },
  ],
};

export const legs: Training = {
  id: "t2",
  name: "Legs",
  exercises: [
    { id: "e3", name: "Squat", sets: 5, reps: 5, weight: 140 },
    { id: "e4", name: "Lunges", sets: 3, reps: 12, weight: 40 },
  ],
};

export const planA: WorkoutPlan = {
  id: "p1",
  name: "Push/Legs",
  trainings: [push, legs],
  schedule: {
    days: {
      Monday: "Push",
      Wednesday: "Legs",
      Friday: "Push",
    },
  },
};

export const planB: WorkoutPlan = {
  id: "p2",
  name: "FBW",
  trainings: [push, legs],
  schedule: {
    days: {
      Tuesday: "Legs",
      Thursday: "Push",
      Saturday: "Legs",
      Sunday: "Push",
    },
  },
};

export const testingUser: User = {
  id: "u1",
  name: "Jan Kowalski",
  workoutPlans: [planA, planB],
  activePlanId: "p2", // aktualnie używany plan
};

// przykładowy log
export const log: DailyTrainingAssignment = {
  date: "2025-10-04",
  planId: "p1",
  trainingId: "t2",
};
