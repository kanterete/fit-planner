import {
  DailyTrainingAssignment,
  WeeklyWorkoutSchedule,
  WorkoutPlan,
} from "@/types/newTypes";

export const dummyWorkoutPlan: WorkoutPlan[] = [
  {
    id: "plan-1",
    name: "4 Day Split",
    trainings: [
      {
        name: "Push Day",
        exercises: [
          {
            id: "exercise-1",
            name: "Bench Press",
            sets: 4,
            reps: 8,
            weight: 70,
          },
          { id: "exercise-2", name: "OHP", sets: 3, reps: 10, weight: 40 },
        ],
      },
      {
        name: "Pull Day",
        exercises: [
          { id: "exercise-3", name: "Deadlift", sets: 4, reps: 6, weight: 100 },
          {
            id: "exercise-4",
            name: "Barbell Row",
            sets: 3,
            reps: 8,
            weight: 60,
          },
        ],
      },
      {
        name: "Leg Day",
        exercises: [
          { id: "exercise-5", name: "Squat", sets: 4, reps: 8, weight: 80 },
          {
            id: "exercise-6",
            name: "Leg Press",
            sets: 3,
            reps: 10,
            weight: 120,
          },
        ],
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
            id: "exercise-1",
            name: "Incline Bench Press",
            sets: 4,
            reps: 8,
            weight: 70,
          },
          {
            id: "exercise-2",
            name: "Dumbell Press",
            sets: 3,
            reps: 10,
            weight: 40,
          },
        ],
      },
      {
        name: "Pull A",
        exercises: [
          {
            id: "exercise-3",
            name: "Triceps pulldown",
            sets: 4,
            reps: 6,
            weight: 100,
          },
          {
            id: "exercise-4",
            name: "Biceps curl",
            sets: 3,
            reps: 8,
            weight: 60,
          },
        ],
      },
      {
        name: "Leg Day",
        exercises: [],
      },
    ],
  },
];

export const dummyWeeklySchedule: WeeklyWorkoutSchedule = {
  planId: "plan-2",
  days: {
    Monday: "Push Day",
    Tuesday: "Pull Day",
    Wednesday: "Push Day",
    Thursday: "Leg Day",
    Friday: "Push Day",
    Saturday: "Pull Day",
    Sunday: "Leg Day",
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
