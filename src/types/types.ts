export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type TrainingDay = {
  id: number;
  name: string;
  date: string;
  exercises: Exercise[];
};

export type Meal = {
  name: string;
  items: string[];
  calories: number;
};

export type DietDay = {
  id: number;
  date: string;
  meals: Meal[];
};
