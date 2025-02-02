import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// CartProvider component to wrap your app
export const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]); // Renamed to 'cart' for consistency

   // Add item to cart
   const addToCart = (item) => {
      setCart((prevItems) => {
         const existingItem = prevItems.find((i) => i.equipment_id === item.equipment_id);
         if (existingItem) {
            return prevItems.map((i) =>
               i.equipment_id === item.equipment_id ? { ...i, quantity: i.quantity + 1 } : i
            );
         }
         return [...prevItems, { ...item, quantity: 1 }];
      });
   };

   // Remove item from cart
   const removeFromCart = (itemId) => {
      setCart((prevItems) => prevItems.filter((item) => item.equipment_id !== itemId));
   };

   // Update item quantity
   const updateQuantity = (itemId, newQuantity) => {
      setCart((prevItems) =>
         prevItems.map((item) =>
            item.equipment_id === itemId ? { ...item, quantity: newQuantity } : item
         )
      );
   };

   return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
         {children}
      </CartContext.Provider>
   );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
