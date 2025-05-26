import {
  DailyTrainingAssignment,
  WeeklyWorkoutSchedule,
  WorkoutPlan,
} from "@/types/newTypes";
import { v4 as uuidv4 } from "uuid";

export const dummyWorkoutPlan: WorkoutPlan[] = [
  {
    id: "plan-1",
    name: "4 Day Split",
    trainings: [
      {
        name: "Push Day",
        exercises: [
          { id: uuidv4(), name: "Bench Press", sets: 4, reps: 8, weight: 70 },
          { id: uuidv4(), name: "OHP", sets: 3, reps: 10, weight: 40 },
        ],
      },
      {
        name: "Pull Day",
        exercises: [
          { id: uuidv4(), name: "Deadlift", sets: 4, reps: 6, weight: 100 },
          { id: uuidv4(), name: "Barbell Row", sets: 3, reps: 8, weight: 60 },
        ],
      },
      {
        name: "Leg Day",
        exercises: [
          { id: uuidv4(), name: "Squat", sets: 4, reps: 8, weight: 80 },
          { id: uuidv4(), name: "Leg Press", sets: 3, reps: 10, weight: 120 },
        ],
      },
      {
        name: "Rest Day",
        exercises: [],
      },
    ],
  },
  {
    id: "plan-2",
    name: "FBW",
    trainings: [
      {
        name: "Push Day",
        exercises: [
          {
            id: uuidv4(),
            name: "Incline Bench Press",
            sets: 4,
            reps: 8,
            weight: 70,
          },
          {
            id: uuidv4(),
            name: "Dumbell Press",
            sets: 3,
            reps: 10,
            weight: 40,
          },
        ],
      },
      {
        name: "Pull Day",
        exercises: [
          {
            id: uuidv4(),
            name: "Triceps pulldown",
            sets: 4,
            reps: 6,
            weight: 100,
          },
          { id: uuidv4(), name: "Biceps curl", sets: 3, reps: 8, weight: 60 },
        ],
      },
      {
        name: "Leg Day",
        exercises: [
          { id: uuidv4(), name: "Squat", sets: 4, reps: 8, weight: 80 },
          { id: uuidv4(), name: "Leg Press", sets: 3, reps: 10, weight: 120 },
        ],
      },
      {
        name: "Rest Day",
        exercises: [],
      },
    ],
  },
];

export const dummyWeeklySchedule: WeeklyWorkoutSchedule = {
  planId: "plan-1",
  days: {
    Monday: "Push Day",
    Tuesday: "Pull Day",
    Wednesday: "Rest Day",
    Thursday: "Leg Day",
    Friday: "Push Day",
    Saturday: "Pull Day",
    Sunday: "Rest Day",
  },
};

export const dummyDailyAssignments: DailyTrainingAssignment[] = [
  {
    date: "2025-05-29",
    planId: "plan-1",
    trainingName: "Push Day",
  },
  {
    date: "2025-05-30",
    planId: "plan-1",
    trainingName: "Leg Day",
  },
];
