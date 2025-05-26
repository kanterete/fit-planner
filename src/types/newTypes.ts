export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

//signle day - Push day, Leg day
export type Training = {
  name: string;
  exercises: Exercise[];
};

//Training plan (fbw, 4-day split, 5-day split)
export type WorkoutPlan = {
  id: string;
  name: string;
  trainings: Training[];
};

//Schedule of week
export type WeeklyWorkoutSchedule = {
  planId: string;
  days: {
    [day: string]: string; //Monday: 'Push Day
  };
};

//Date assignment to training
export type DailyTrainingAssignment = {
  date: string;
  planId: string;
  trainingName: string;
};
