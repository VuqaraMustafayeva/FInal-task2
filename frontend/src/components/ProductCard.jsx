// ultra yeni
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, getCartQty, getWishlistQty } = useContext(CartContext);
  const cartQty = getCartQty(product._id);
  const wishQty = getWishlistQty(product._id);
// qty nece eded oldugunu qaytarir bize 
  return (
    <li className="card">
      <Link to={`/products/${product._id}`} className="card-img">
      {/* mehsulun sekline kecis */}
        <img src={product.image || "https://via.placeholder.com/400x300?text=No+Image"} alt={product.name} />
      </Link>

      <div className="card-body">
        <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link>
        <p className="price">${product.price}</p>
        <p className="desc">{product.description?.slice(0, 100)}</p>

        <div className="specs">
          {product.ram && <span>RAM: {product.ram}</span>}
          {product.storage && <span>Storage: {product.storage}</span>}
          {product.size && <span>Size: {product.size}</span>}
          {product.gpu && <span>GPU: {product.gpu}</span>}
        </div>

        <div className="actions">
          <button className="btn" onClick={() => addToCart(product)}>
            Add to Cart {cartQty > 0 && <span className="badge">{cartQty}</span>}
          </button>

          <button className="btn outline" onClick={() => addToWishlist(product)}>
            Wishlist {wishQty > 0 && <span className="badge">{wishQty}</span>}
          </button>
        </div>
      </div>
    </li>
  );
}
