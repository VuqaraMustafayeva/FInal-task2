import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, increaseWishlistQty, decreaseWishlistQty, removeFromWishlist } = useContext(CartContext);

  return (
    <div className="page">
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>wishlistde mehsul yoxdur</p>
      ) : (
        <ul className="cart-list">
          {wishlist.map((i) => (
            <li key={i.product._id} className="cart-item">
              <img src={i.product.image || "https://via.placeholder.com/200"} alt={i.product.name} />
              <div className="cart-info">
                <h3>{i.product.name}</h3>
                <p>{i.product.description}</p>
                <p><strong>${i.product.price}</strong></p>
                <div className="qty-controls">
                  <button onClick={() => decreaseWishlistQty(i.product._id)}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => increaseWishlistQty(i.product._id)}>+</button>
                  <button className="remove" onClick={() => removeFromWishlist(i.product._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
