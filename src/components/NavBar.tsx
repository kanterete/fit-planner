import { Bell, CircleUserRound } from "lucide-react";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <h1>FitPlanner</h1>
      <ul>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="">Training</a>
        </li>
        <li>
          <a href="">Diet</a>
        </li>
      </ul>
      <div>
        <Bell />
        <CircleUserRound />
      </div>
    </nav>
  );
};

export default NavBar;
