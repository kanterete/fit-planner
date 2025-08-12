"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Meal } from "@/types/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

type DietItemProps = {
  meals: Meal[];
};

const DietItem = ({ meals }: DietItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const toggleDropdown = (index: number) => {
    setIsOpen((prev) => prev.map((open, i) => (i === index ? !open : open)));
  };

  useEffect(() => {
    if (meals) setIsOpen(new Array(meals.length).fill(false));
  }, [meals]);

  if (meals.length === 0) {
    return (
      <span className="text-xl text-gray-400 font-semibold">Cheat day 😋</span>
    );
  }

  return (
    <>
      {meals.map((meal, index) => (
        <div key={index} className="flex flex-col">
          <div className="text-gray-500 sm:gap-4 ">
            <p
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer font-medium flex justify-between text-xl text-blue-700"
            >
              {meal.time}
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
                  <ul>
                    {meal.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex text-md ml-2 mb-2 text-black justify-between"
                      >
                        - {item}
                        {/* <Trash color="blue" onClick={removeMeal()}/> */}
                      </li>
                    ))}
                  </ul>
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
