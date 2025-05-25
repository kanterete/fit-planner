import { Plus } from "lucide-react";
import React from "react";

type TrainingButtonProps = {
  collectData: (e: React.FormEvent) => void;
};
const TrainingButton = ({ collectData }: TrainingButtonProps) => {
  return (
    <button
      onClick={collectData}
      className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center gap-2 items-center font-semibold"
    >
      <Plus size={20} />
      Add workout
    </button>
  );
};

export default TrainingButton;
