import { Exercise, Training } from "@/types/types";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

type CustomTrainingFormProps = {
  trainings: Training[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
};

const CustomTrainingForm = ({
  trainings,
  setTrainings,
}: CustomTrainingFormProps) => {
  const [trainingName, setTrainingName] = useState("");
  const [input, setInputs] = useState<Exercise[]>([]);

  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [weight, setWeight] = useState(50);

  const handleAddExercise = () => {
    if (!exerciseName || sets <= 0 || reps <= 0 || weight < 0) {
      toast.warning("All exercise fields must be valid!");
      return;
    }

    setInputs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: exerciseName,
        sets,
        reps,
        weight,
      },
    ]);

    toast.success(`Exercise "${exerciseName}" added!`);

    setExerciseName("");
    setSets(1);
    setReps(1);
    setWeight(50);
  };

  const handleDeleteExercise = (id: string) => {
    setInputs((prev) => prev.filter((ex) => ex.id !== id));
    toast.success("Exercise deleted");
  };

  const handleTraining = () => {
    if (!trainingName || !(input.length > 0)) {
      toast.warning("Training name and exercises are required!");
      return;
    }

    if (trainings.some((t) => t.name === trainingName)) {
      toast.warning("Training with this name already exists!");
      return;
    }

    const newTraining: Training = {
      id: crypto.randomUUID(),
      name: trainingName,
      exercises: [...input],
    };

    const updatedTrainings = [...trainings, newTraining];

    setTrainings(updatedTrainings);
    localStorage.setItem("trainings", JSON.stringify(updatedTrainings));

    toast.success(`Training "${trainingName}" added successfully`);

    // Clearing
    setTrainingName("");
    setInputs([]);
  };

  return (
    <section className="h-fit max-w-125 p-2 rounded-xl">
      <h1 className="text-2xl mb-2 font-semibold">
        Create custom training for your own workout plan
      </h1>
      <form className="flex flex-col gap-2" action={handleTraining}>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex flex-col bg-primary-foreground text-center rounded-xl p-2">
            <label htmlFor="trainingName" className="mb-2 font-semibold">
              Training name:
            </label>
            <input
              type="text"
              name="trainingName"
              id="trainingName"
              className="border-1 p-1 rounded-lg"
              placeholder="naaame"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
            />
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
                  {inp.name}
                </p>

                <div className="flex items-center justify-between md:w-1/3">
                  <p className="p-1 rounded-lg whitespace-nowrap">
                    {inp.reps} rep
                  </p>
                  x
                  <p className="p-1 rounded-lg whitespace-nowrap">
                    {inp.sets} set
                  </p>
                  x
                  <p className="p-1 rounded-lg whitespace-nowrap">
                    {inp.weight} kg
                  </p>
                </div>
                <Button
                  className=" bg-red-600  text-white"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteExercise(inp.id);
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
            Add exercise:
          </label>
          <div className="flex flex-col md:flex-row w-full items-center gap-2 rounded-lg">
            <div className="flex items-center">
              <input
                type="text"
                name="name"
                id="name"
                className="border-1 border-primary border-dashed p-1 rounded-lg"
                placeholder="naaame"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="reps"
                  min={0}
                  className="w-10 border-1 border-primary border-dashed p-1 rounded-lg"
                  placeholder="3"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  required
                />
                r
              </div>
              x
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="sets"
                  id=""
                  min={0}
                  className="w-10 border-1 border-primary border-dashed p-1 rounded-lg"
                  placeholder="10"
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                  required
                />
                s
              </div>
              x
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="weight"
                  min={0}
                  id=""
                  className="w-10 border-1 border-primary border-dashed p-1 rounded-lg"
                  placeholder="50"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  required
                />
                kg
              </div>
            </div>
            <Button
              className=" bg-primary w-full md:max-w-10 text-white"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleAddExercise();
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
          Add your custom training!
        </Button>
      </form>
    </section>
  );
};

export default CustomTrainingForm;
