// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token");
  

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token exists, render the component
  return <Element />;
};

export default PrivateRoute;
