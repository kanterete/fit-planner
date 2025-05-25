import { TrainingDay } from "@/types/types";
import { DumbbellIcon, Plus } from "lucide-react";
import React from "react";
import Link from "next/link";
import TrainingItem from "./TrainingItem";

type TrainingListProps = {
  trainingToday?: TrainingDay;
};

const TrainingList = ({ trainingToday }: TrainingListProps) => {
  const exercises = trainingToday?.exercises ?? [];

  return (
    <div className="flex flex-col md:flex-row rounded-xl h-fit w-fit gap-4 grow shrink">
      <div className="border-2 flex flex-col border-gray-100 rounded-xl p-4 max-w-[450px] gap-4 h-fit">
        <div>
          <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
            <DumbbellIcon color="blue" /> Training
          </h1>
          {exercises.length > 0 ? (
            <TrainingItem exercises={exercises} />
          ) : (
            <span className="text-xl text-gray-400 font-semibold">
              Rest day 😌
            </span>
          )}
        </div>

        <Link
          href="/add-workout"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition-all flex justify-center gap-2 items-center w-full"
        >
          <Plus size={20} />
          Add workout
        </Link>
      </div>
    </div>
  );
};

export default TrainingList;
