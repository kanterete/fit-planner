import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Training, WorkoutPlan } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type AddTrainingFormProps = {
  trainings: Training[];
  workouts: WorkoutPlan[];
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>;
  setWorkoutPlan: React.Dispatch<React.SetStateAction<WorkoutPlan | undefined>>;
};

const AddTrainingForm = ({
  trainings,
  workouts,
  setWorkouts,
  setWorkoutPlan,
}: AddTrainingFormProps) => {
  const [input, setInputs] = useState<Training[]>([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState("");
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");

  const handleAddToInputs = () => {
    if (!selectedTrainingId) {
      toast.warning("You must select training!");
      return;
    }

    const selectedTraining = trainings.find((t) => t.id === selectedTrainingId);
    if (!selectedTraining) return;

    setInputs((prev) => [
      ...prev,
      { ...selectedTraining, id: crypto.randomUUID() },
    ]);

    toast.success(`Training "${selectedTraining.name}" added to list`);
  };

  const handleRemoveFromInputs = (id: string) => {
    setInputs((prev) => prev.filter((t) => t.id !== id));
    toast.success("Training removed from list");
  };

  const handleTraining = () => {
    if (!selectedWorkoutId || input.length === 0) {
      toast.warning("There are empty fields");
      return;
    }

    const newWorkouts = workouts.map((w) =>
      w.id === selectedWorkoutId
        ? { ...w, trainings: [...w.trainings, ...input] }
        : w
    );

    setWorkouts(newWorkouts);

    const updatedWorkout = newWorkouts.find((w) => w.id === selectedWorkoutId);

    if (updatedWorkout) {
      setWorkoutPlan(updatedWorkout);
      localStorage.setItem("workoutPlan", JSON.stringify(updatedWorkout));
    }
    localStorage.setItem("workouts", JSON.stringify(newWorkouts));

    toast.success(
      `${input.map((i) => i.name).join(", ")} added to ${updatedWorkout?.name}`
    );

    setInputs([]);
  };

  return (
    <section className="h-fit max-w-125 p-2 rounded-xl">
      <h1 className="text-2xl mb-2 font-semibold">
        Add your training to your workout!
      </h1>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex flex-col bg-primary-foreground text-center rounded-xl p-2">
            <label htmlFor="trainingName" className="mb-2 font-semibold">
              Workout:
            </label>
            <Select
              value={selectedWorkoutId}
              onValueChange={setSelectedWorkoutId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Change your plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {workouts.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.name} - {w.id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {input.length > 0 ? (
          <div className="bg-primary-foreground text-center rounded-xl p-2">
            <h1 className="font-semibold">Your exercises: </h1>
            {input.map((inp) => (
              <div
                className="flex flex-col mb-2 md:flex-row mx-auto px-2 justify-between items-center border-1 rounded-lg "
                key={inp.id}
              >
                <p className="p-1 rounded-lg whitespace-nowrap font-semibold">
                  {inp.name} - {inp.id}
                </p>
                <ol>
                  {inp.exercises.map((ex) => (
                    <li key={ex.id}>
                      {ex.id} - {ex.name} - {ex.reps} - {ex.sets} - {ex.weight}
                    </li>
                  ))}
                </ol>

                <Button
                  className=" bg-red-600  text-white"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromInputs(inp.id);
                  }}
                >
                  <Minus />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="bg-primary-foreground text-center rounded-xl p-2">
          <label htmlFor="name" className="text-xl font-semibold">
            Add training:
          </label>
          <div className="flex flex-col md:flex-row w-full items-center gap-2 rounded-lg">
            <div className="flex items-center">
              <Select
                value={selectedTrainingId}
                onValueChange={setSelectedTrainingId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Change your plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {trainings.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name} - {t.id}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              className=" bg-primary w-full md:max-w-10 text-white"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleAddToInputs();
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <Button
          className=" bg-primary w-full text-white"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            handleTraining();
          }}
        >
          Add your training!
        </Button>
      </form>
    </section>
  );
};

export default AddTrainingForm;
