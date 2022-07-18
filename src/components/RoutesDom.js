import React from "react";
import { Routes, Route } from "react-router";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

import Home from "./pages/Home";

const RoutesDom = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
};

export default RoutesDom;
