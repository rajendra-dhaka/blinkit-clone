import { createContext, useContext, useState } from "react";

interface ProductType {
  name: string;
  image_url: string;
  mrp: number;
  price: number;
  unit: string;
  quantity?: number; // Add quantity to track the number of items
}

interface CartContextType {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        // If product exists, increase its quantity
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: ProductType) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );
      if (
        existingProduct &&
        existingProduct.quantity &&
        existingProduct.quantity > 1
      ) {
        // Decrease the quantity if it is more than 1
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        );
      } else {
        // If quantity is 1, remove the product from the cart
        return prevCart.filter((item) => item.name !== product.name);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
