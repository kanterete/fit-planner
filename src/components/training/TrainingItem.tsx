import { Exercise } from "@/types/newTypes";

type TrainingItemProps = {
  exercises?: Exercise[];
};

const TrainingItem = ({ exercises = [] }: TrainingItemProps) => {
  if (exercises.length === 0) {
    return (
      <span className="text-xl text-gray-400 font-semibold">Rest day 😌</span>
    );
  }

  return (
    <div className="flex flex-col text-xl font-medium w-full justify-between">
      <ol>
        {exercises.map((exercise, id) => (
          <li
            key={id}
            className="text-gray-500 flex flex-col sm:flex-row justify-between md:gap-4"
          >
            {id + 1}. {exercise.name}{" "}
            <span className="text-black">
              {exercise.sets}x{exercise.reps} - {exercise.weight} kg
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TrainingItem;
