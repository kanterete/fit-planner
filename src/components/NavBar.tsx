"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, CircleUserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="mx-auto flex items-center justify-between w-full h-24 p-4 border-b border-gray-200">
      <h1 className="text-2xl md:text-4xl p-4 font-bold">
        Fit<span className="text-blue-600 ">Planner</span>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex text-center items-center font-medium p-4 text-xl md:text-2xl">
        <li className="p-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="p-4">
          <Link href="/add-workout" className="hover:underline">
            Workout
          </Link>
        </li>
        <li className="p-4">
          <Link href="/add-diet" className="hover:underline">
            Diet
          </Link>
        </li>
      </ul>

      {/* Notification Menu */}
      <div className="flex items-center p-4">
        <div className={`hidden sm:flex items-center gap-4`}>
          <Bell size={30} className="cursor-pointer" />
          <CircleUserRound size={30} className="cursor-pointer" />
        </div>

        {/* Mobile toggle */}
        <div className={`p-4 md:hidden`} onClick={toggleNav}>
          <Menu size={30} />
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-blue-400 text-white p-4 md:hidden z-50"
            >
              <div className="flex justify-end gap-4">
                <div className="flex gap-4">
                  <Bell size={30} />
                  <CircleUserRound size={30} />
                </div>
                <X onClick={toggleNav} size={30} />
              </div>

              <h1 className="text-2xl py-4 text-center">
                Fit<span className="text-blue-900">Planner</span>
              </h1>
              <ul className="flex flex-col text-center items-center py-4 text-xl">
                <li
                  className="py-4 border-b border-gray-200 cursor-pointer w-full"
                  onClick={toggleNav}
                >
                  <Link href="/" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li
                  className="py-4 border-b border-gray-200 cursor-pointer w-full"
                  onClick={toggleNav}
                >
                  <Link href="/add-workout" className="hover:underline">
                    Workout
                  </Link>
                </li>
                <li
                  className="py-4 cursor-pointer border-b border-gray-200 w-full"
                  onClick={toggleNav}
                >
                  <Link href="/add-diet" className="hover:underline">
                    Diet
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
