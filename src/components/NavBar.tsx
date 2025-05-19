"use client";

import { Bell, CircleUserRound, Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between max-w-[1240px] h-24 p-4 border-b border-gray-200">
      <h1 className="text-4xl p-4">
        Fit<span className="">Planner</span>
      </h1>

      <ul className="hidden md:flex text-center items-center p-4 text-3xl">
        <li className="p-4">
          <a href="#">Dashboard</a>
        </li>
        <li className="p-4">
          <a href="">Training</a>
        </li>
        <li className="p-4">
          <a href="">Diet</a>
        </li>
      </ul>
      <div className="flex items-center p-4">
        <div className={`hidden sm:flex items-center gap-4`}>
          <Bell size={36} />
          <CircleUserRound size={36} />
        </div>

        <div
          className={`${!isOpen ? "block" : "hidden"} p-4 md:hidden`}
          onClick={toggleNav}
        >
          <Menu size={36} />
        </div>

        <div
          className={` 
          ${
            isOpen
              ? "fixed top-0 left-0 w-full transition duration-500 ease-in-out overflow-y-hidden "
              : "fixed left-[100%]"
          } bg-blue-400 h-full text-white text-shadow-2xs p-4 md:hidden`}
        >
          <div className="flex justify-end gap-4">
            <div className="flex gap-4">
              <Bell size={36} />
              <CircleUserRound size={36} />
            </div>
            <X onClick={toggleNav} size={40} />
          </div>

          <h1 className="text-4xl py-4 text-center">
            Fit<span className="text-blue-900">Planner</span>
          </h1>
          <ul className="flex flex-col text-center items-center py-4 text-3xl">
            <li
              className="py-4 border-b border-gray-200 cursor-pointer w-full"
              onClick={toggleNav}
            >
              <a href="#">Dashboard</a>
            </li>
            <li
              className="py-4 border-b border-gray-200 cursor-pointer w-full"
              onClick={toggleNav}
            >
              <a href="#">Training</a>
            </li>
            <li
              className="py-4 cursor-pointer border-b border-gray-200 w-full"
              onClick={toggleNav}
            >
              <a href="#">Diet</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
