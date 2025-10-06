// ultra yeni

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartCount, wishlistCount } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/products" className="brand">MyStore</Link>
      </div>

      <div className="center">
        {/* <Link to="/products">Products</Link> */}
        {token && <Link to="/cart">Cart ({cartCount})</Link>}
        {token && <Link to="/wishlist">Wishlist ({wishlistCount})</Link>}
      </div>

      <div className="right">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
            <Link to="/admin">Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
}
