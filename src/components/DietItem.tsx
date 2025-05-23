import { DietDay } from "@/types/types";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

type DietItemProps = {
  hasDietToday: DietDay | undefined;
};

const DietItem = ({ hasDietToday }: DietItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      {hasDietToday?.meals.map((meal, index) => (
        <p key={index} className="text-gray-500 flex justify-between sm:gap-4 ">
          {meal.name}
          <ChevronRight className="cursor-pointer" onClick={toggleDropdown} />
        </p>
      ))}
    </>
  );
};

export default DietItem;
