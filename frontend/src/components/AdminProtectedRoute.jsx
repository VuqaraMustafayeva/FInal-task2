import React from "react";
import { Navigate } from "react-router-dom";

// jwt tokeni acmaq ucundu bu funksiya atob-base64 u adi metne cevirir
function parseJwt(token) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

// children-AdminPanel
export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  const payload = parseJwt(token);
  if (!payload || payload.role !== "admin") {
    alert("This area is for admin only.");
    return <Navigate to="/products" replace />;
  }
  return children;
}
