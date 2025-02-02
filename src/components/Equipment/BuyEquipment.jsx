import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bdt_icon from "../../assets/bdt_icon.svg";
import bdt_icon2 from "../../assets/bdt_icon2.svg";

const BuyEquipment = () => {

   const [equipment, setEquipment] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:5000/equipment')
         .then(response => {
            setEquipment(response.data);
         })
         .catch(error => {
            console.error('There was an error fetching the equipment data!', error);
         });
   }, []);

   // console.log(equipment);


   return (
      <div>

         <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' >
            {

               equipment.map((equip) => <div key={equip.equipment_id} className="card card-side bg-base-200 shadow-md">
                  <figure className="w-48 h-48 flex items-center justify-center overflow-hidden bg-gray-100">
                     <img className="w-full h-full object-cover" src={equip.image_url} alt={equip.name} />
                  </figure>

                  <div className="card-body">
                     <h2 className="card-title">{equip.name}</h2>
                     <p>{equip.description}</p>
                     
                     <p className='pt-4 text-[16px] flex items-center' ><img src={bdt_icon2} alt="bdt_icon" className='size-5' /> {equip.price}</p>
                     <div className="card-actions justify-end">
                        <button className="btn btn-error ">Add to cart</button>
                     </div>
                  </div>
               </div>
               )

            }



         </div>



      </div>
   );
};

export default BuyEquipment;