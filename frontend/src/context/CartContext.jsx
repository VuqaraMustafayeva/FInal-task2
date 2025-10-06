import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
// kart deyisende 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  //sebet
  const addToCart = (product) => {
    setCart((prev) => {
      // mehsul sebetde varmi? varsa qty+1
      const found = prev.find((i) => i.product._id === product._id);
      
      if (found) return prev.map((i) => (i.product._id === product._id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.product._id !== id));
  };

  const increaseCartQty = (id) => {
    setCart((prev) => prev.map((i) => (i.product._id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decreaseCartQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product._id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  // cartla eyni mehsul sebetde varsa +1 yoxdusa qty 1
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const found = prev.find((i) => i.product._id === product._id);
      if (found) return prev.map((i) => (i.product._id === product._id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.product._id !== id));
  };

  const increaseWishlistQty = (id) => {
    setWishlist((prev) => prev.map((i) => (i.product._id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decreaseWishlistQty = (id) => {
    setWishlist((prev) =>
      prev
        .map((i) => (i.product._id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishlistCount = wishlist.reduce((s, i) => s + i.qty, 0);

  const getCartQty = (id) => {
    const it = cart.find((i) => i.product._id === id);
    return it ? it.qty : 0;
  };

  const getWishlistQty = (id) => {
    const it = wishlist.find((i) => i.product._id === id);
    return it ? it.qty : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        increaseCartQty,
        decreaseCartQty,
        addToWishlist,
        removeFromWishlist,
        increaseWishlistQty,
        decreaseWishlistQty,
        cartCount,
        wishlistCount,
        getCartQty,
        getWishlistQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
