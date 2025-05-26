export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Training = {
  name: string;
  exercises: Exercise[];
};

export type WorkoutPlan = {
  id: string;
  name: string;
  trainings: Training[];
};

export type WeeklyWorkoutSchedule = {
  planId: string;
  days: {
    [day: string]: string; //Monday: 'Push Day
  };
};

export type DailyTrainingAssignment = {
  date: string;
  planId: string;
  trainingName: string;
};
