import { createContext, useContext, useState } from "react";

const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if prodcut is already there in array if not then add it else increase the quatity
  };
  const removeFromCart = (product) => {
    // Check if prodcut is already there in array if not then dont do anything else decrease the quantity by 1
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
