import { Plus } from "lucide-react";
import React from "react";

type AddMealButtonProps = {
  collectData: (e: React.FormEvent) => void;
};

const AddMealButton = ({ collectData }: AddMealButtonProps) => {
  return (
    <button
      onClick={collectData}
      className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center gap-2 items-center font-semibold"
    >
      <Plus size={20} />
      Add meal
    </button>
  );
};

export default AddMealButton;
