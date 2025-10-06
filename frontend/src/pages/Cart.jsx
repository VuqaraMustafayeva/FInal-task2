import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseCartQty, decreaseCartQty, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="page">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Sebetde mehsul yoxdur</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((i) => (
              <li key={i.product._id} className="cart-item">
                <img src={i.product.image || "https://via.placeholder.com/200"} alt={i.product.name} />
                <div className="cart-info">
                  <h3>{i.product.name}</h3>
                  <p>{i.product.description}</p>
                  <p><strong>${i.product.price}</strong></p>
                  <div className="qty-controls">
                    <button onClick={() => decreaseCartQty(i.product._id)}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => increaseCartQty(i.product._id)}>+</button>
                    <button className="remove" onClick={() => removeFromCart(i.product._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="btn">Checkout (demo)</button>
          </div>
        </>
      )}
    </div>
  );
}
