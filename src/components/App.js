import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RoutesDom from "./RoutesDom";
const App = () => {
  return (
    <>
      <ToastContainer />
      <RoutesDom />
    </>
  );
};

export default App;
