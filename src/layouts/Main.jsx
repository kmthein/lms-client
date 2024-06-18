import React from "react";
import { Outlet } from "react-router-dom";
import bgVector from "../assets/bg_vector.png";
import Navbar from "../components/user/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
