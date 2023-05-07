import React from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "../Pages/Authentication";
import ContactList from "../Pages/ContactList";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/contact" element={<ContactList />} />
    </Routes>
  );
};

export default AllRoutes;
