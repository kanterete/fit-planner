export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
export interface Training {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface User {
  id: string;
  name: string;
  workoutPlans: WorkoutPlan[];
  activePlanId?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  trainings: Training[];
  schedule: WeeklyWorkoutSchedule;
}

// Schedule tygodniowy przypięty do planu
export interface WeeklyWorkoutSchedule {
  days: Partial<Record<WeekDay, string>>;
  // klucz = dzień tygodnia
  // wartość = nazwa treningu z danego planu
  // Partial bo nie zawsze każdy dzień będzie miał trening
}

// Konkretny dzień w kalendarzu
export interface DailyTrainingAssignment {
  date: string;
  planId: string;
  trainingId: string;
}
