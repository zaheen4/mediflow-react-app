import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from 'react';

const Cart = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   const updateQuantity = (id, newQuantity) => {
      const updatedCart = cart.map(item =>
         item.equipment_id === id ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
   };

   const removeItem = (id) => {
      const updatedCart = cart.filter(item => item.equipment_id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
   };

   const handleCheckout = () => {
      setCart([]);
      localStorage.removeItem("cart");
      alert("Checkout successful! Your cart has been cleared.");
   };

   const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

   return (
      <div className="container mx-auto p-6">
         <h2 className="text-2xl font-bold mb-4 ml-25">Shopping Cart</h2>
         <div className="grid grid-cols-1 gap-6 w-[85%] mx-auto">
            {cart.map((item) => (
               <div key={item.equipment_id} className="card flex flex-row bg-[#ffffff] shadow-md p-4">
                  <figure className="w-24 h-24 bg-gray-100 flex items-center justify-center mr-4">
                     <img className="w-full h-full object-cover" src={item.image_url} alt={item.name} />
                  </figure>
                  <div className="ml-4 flex-1">
                     <h3 className="font-bold">{item.name}</h3>
                     <p className="text-gray-600">{item.description}</p>
                     <p className="font-semibold">Price: {item.price} BDT</p>
                     <div className="flex items-center mt-2">
                        <input
                           type="number"
                           className="border p-1 w-16 text-center"
                           value={item.quantity || 1}
                           onChange={(e) => updateQuantity(item.equipment_id, parseInt(e.target.value))}
                           min="1"
                        />
                        <button className="text-red-600 ml-4" onClick={() => removeItem(item.equipment_id)}>
                           <FaTrash />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Floating Checkout Button */}
         {cart.length > 0 && (
            <button
               className="fixed bottom-18 right-20 bg-red-500 text-white p-4 rounded-full shadow-lg font-bold"
               onClick={handleCheckout}
            >
               Checkout ({totalPrice} BDT)
            </button>
         )}
      </div>
   );
};

export default Cart;
