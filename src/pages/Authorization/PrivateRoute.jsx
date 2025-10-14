// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // Get the logged-in user from Redux
  const loggedInUser = useSelector((state) => state.user.loggedUser);

  // If user exists, render the children (protected page)
  // Otherwise redirect to login page
  return loggedInUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
