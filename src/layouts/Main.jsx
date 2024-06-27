import React from "react";
import { Outlet } from "react-router-dom";
import bgVector from "../assets/bg_vector.png";
import Navbar from "../components/user/Navbar";

const Main = () => {
  return (
    <div className=" max-w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
