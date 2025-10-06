// eger login olmayibsa onu login sehifesine gonderir
import React from "react";
import { Navigate } from "react-router-dom";

export default function 
// children - dashboard
ProtectedRoute({ children }) {
  // token varsa login olub yoxdusa olmayib
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
