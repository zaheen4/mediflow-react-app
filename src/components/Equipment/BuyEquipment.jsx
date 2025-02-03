import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bdt_icon2 from "../../assets/bdt_icon2.svg";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const BuyEquipment = () => {

   const [equipment, setEquipment] = useState([]);

   // cart functionality code
   const [cart, setCart] = useState(() => {
      return JSON.parse(localStorage.getItem("cart")) || [];
   });


   const navigate = useNavigate();


   useEffect(() => {
      axios.get('http://localhost:5000/equipment')
         .then(response => {
            setEquipment(response.data);
         })
         .catch(error => {
            console.error('There was an error fetching the equipment data!', error);
         });
   }, []);


   const addToCart = (equip) => {
      const updatedCart = [...cart];
      const itemIndex = updatedCart.findIndex((item) => item.equipment_id === equip.equipment_id);

      if (itemIndex !== -1) {
         updatedCart[itemIndex].quantity += 1;
      } else {
         updatedCart.push({ ...equip, quantity: 1 });
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
   };


   return (
      <div className='justify-center flex mx-36 py-10'>

         <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[90%]' >
            {

               equipment.map((equip) => <div key={equip.equipment_id} className="card card-side bg-[#ffffff] shadow-md">
                  <figure className="w-48 h-48 flex items-center justify-center overflow-hidden">
                     <img className="w-full h-full object-cover mt-10 ml-3" src={equip.image_url} alt={equip.name} />
                  </figure>

                  <div className="card-body">
                     <h2 className="card-title">{equip.name}</h2>
                     <p>{equip.description}</p>

                     <p className='pt-4 text-[16px] flex items-center' ><img src={bdt_icon2} alt="bdt_icon" className='size-5' /> {equip.price}</p>
                     <div className="card-actions justify-end">
                        <button className="btn btn-soft btn-error text-red-400 hover:text-white" onClick={() => addToCart(equip)}>
                           Add to cart
                        </button>
                     </div>
                  </div>
               </div>
               )

            }



         </div>
         {/* Floating Cart Button */}
         <button
            className="fixed bottom-18 right-20 bg-red-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
            onClick={() => navigate('/cart', { state: { cart } })}
         >
            <FaShoppingCart />
            Cart ({Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)})
         </button>


      </div>
   );
};

export default BuyEquipment;