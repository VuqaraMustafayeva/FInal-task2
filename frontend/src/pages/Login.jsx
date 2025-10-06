import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      //tokenle user melumatlarini saxlamaq
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      // producta yonlendirir
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="auth-form" onSubmit={handle}>
      <h2>Login</h2>
      <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="btn">Login</button>
      <p style={{marginTop:10}}>If you don't have an account, <a href="/register">Register</a></p>
    </form>
  );
}