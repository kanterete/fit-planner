import { useState } from "react";
import { WorkoutPlan, Exercise } from "@/types/newTypes";
import { v4 as uuidv4 } from "uuid";

export const useExerciseForm = (
  workout: WorkoutPlan[],
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>
) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedWorkoutName, setSelectedWorkoutName] = useState<string>("");

  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState(1);
  const [exerciseReps, setExerciseReps] = useState(1);
  const [exerciseWeight, setExerciseWeight] = useState(1);

  const selectedWorkout = workout.find((plan) => plan.id === selectedPlanId);

  const resetForm = () => {
    setExerciseName("");
    setExerciseReps(1);
    setExerciseSets(1);
    setExerciseWeight(1);
  };

  const isFormValid =
    !!exerciseName.trim() &&
    !!selectedPlanId &&
    !!selectedWorkoutName &&
    !!exerciseSets &&
    !!exerciseReps &&
    !!exerciseWeight;

  const addExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !selectedWorkout) return;

    const newExercise: Exercise = {
      id: "exercise-" + uuidv4(),
      name: exerciseName,
      sets: exerciseSets,
      reps: exerciseReps,
      weight: exerciseWeight,
    };

    const updatedWorkout = { ...selectedWorkout };
    const training = updatedWorkout.trainings.find(
      (t) => t.name === selectedWorkoutName
    );
    if (!training) return;

    training.exercises.push(newExercise);

    const existingPlans = JSON.parse(localStorage.getItem("workout") || "[]");
    const updatedPlans = existingPlans.map((plan: WorkoutPlan) =>
      plan.id === selectedPlanId ? updatedWorkout : plan
    );

    localStorage.setItem("workout", JSON.stringify(updatedPlans));

    setWorkout((prev) =>
      prev.map((plan) => (plan.id === selectedPlanId ? updatedWorkout : plan))
    );

    resetForm();
  };

  const removeExercise = (
    planId: string,
    trainingName: string,
    exerciseId: string
  ) => {
    const updatedPlans = workout.map((plan) =>
      plan.id !== planId
        ? plan
        : {
            ...plan,
            trainings: plan.trainings.map((training) =>
              training.name !== trainingName
                ? training
                : {
                    ...training,
                    exercises: training.exercises.filter(
                      (exercise) => exercise.id !== exerciseId
                    ),
                  }
            ),
          }
    );

    setWorkout(updatedPlans);
    localStorage.setItem("workout", JSON.stringify(updatedPlans));
  };

  return {
    selectedPlanId,
    setSelectedPlanId,
    selectedWorkoutName,
    setSelectedWorkoutName,
    exerciseName,
    setExerciseName,
    exerciseSets,
    setExerciseSets,
    exerciseReps,
    setExerciseReps,
    exerciseWeight,
    setExerciseWeight,
    selectedWorkout,
    addExercise,
    isFormValid,
    removeExercise,
  };
};
