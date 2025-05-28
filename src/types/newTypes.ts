export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

//signle day - Push day, Leg day
export interface Training {
  name: string;
  exercises: Exercise[];
}

//Training plan (fbw, 4-day split, 5-day split)
export interface WorkoutPlan {
  id: string;
  name: string;
  trainings: Training[];
}

//Schedule of week
export interface WeeklyWorkoutSchedule {
  planId: string;
  days: {
    [day: string]: string; //Monday: 'Push Day
  };
}

//Date assignment to training
export interface DailyTrainingAssignment {
  date: string;
  planId: string;
  trainingName: string;
}
