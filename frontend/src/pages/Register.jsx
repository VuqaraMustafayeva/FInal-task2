import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered. Now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <form className="auth-form" onSubmit={handle}>
      <h2>Register</h2>
      <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn">Register</button>
    </form>
  );
}
