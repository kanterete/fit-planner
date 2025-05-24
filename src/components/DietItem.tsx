import { motion, AnimatePresence } from "framer-motion";
import { DietDay } from "@/types/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

type DietItemProps = {
  hasDietToday: DietDay | undefined;
};

const DietItem = ({ hasDietToday }: DietItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean[]>([]);

  const toggleDropdown = (index: number) => {
    setIsOpen((prev) => prev.map((open, i) => (i === index ? !open : open)));
  };

  useEffect(() => {
    if (hasDietToday)
      setIsOpen(new Array(hasDietToday.meals.length).fill(false));
  }, [hasDietToday]);

  return (
    <>
      {hasDietToday?.meals.map((meal, index) => (
        <div key={index} className="flex flex-col">
          <div className="text-gray-500 sm:gap-4 ">
            <p
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer font-medium flex justify-between text-xl"
            >
              {meal.name}
              {!isOpen[index] ? (
                <ChevronRight color="blue" />
              ) : (
                <ChevronDown color="blue" />
              )}
            </p>
            <AnimatePresence initial={false}>
              {isOpen[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ol className="point">
                    {meal.items.map((item, i) => (
                      <li key={i} className="flex text-md ml-2 text-black ">
                        {item}
                      </li>
                    ))}
                  </ol>
                  <p className="font-normal italic">
                    Total Calories:{" "}
                    <span className="font-semibold text-blue-600">
                      {meal.calories}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  );
};

export default DietItem;
