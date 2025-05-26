import { NotebookPen, Pen } from "lucide-react";
import React from "react";

const WorkoutForm = () => {
  return (
    <div className="border-2 flex flex-col border-gray-100 rounded-xl justify-center p-4 w-full max-w-[300px] h-fit">
      <h1 className="font-semibold flex gap-5 items-center mb-2 text-2xl">
        <NotebookPen color="blue" /> Add workout
      </h1>
      <form className="text-black border-0 border-gray-200 w-full">
        <label
          className="mb-2 flex gap-2 justify-between"
          htmlFor="workoutName"
        >
          Workout name
          <Pen color="blue" />
        </label>

        <input
          id="workoutName"
          type="text"
          name="workoutName"
          placeholder=" Push day - Type A"
          className="rounded-xl p-0.5 border-2 mb-4 border-gray-200 w-full"
        />

        <input
          type="submit"
          className="text-white bg-blue-500 rounded-xl p-2 mt-4 flex justify-center w-full items-center font-semibold"
          value="+ Add plan"
        />
      </form>
    </div>
  );
};

export default WorkoutForm;
