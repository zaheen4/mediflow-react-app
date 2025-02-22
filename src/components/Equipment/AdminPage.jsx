import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminPage = () => {
   const [equipment, setEquipment] = useState([]);
   const [editing, setEditing] = useState(null);

   const [newEquipment, setNewEquipment] = useState({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image_url: "",
   });


   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
   // console.log(API_BASE_URL);


   const token = JSON.parse(localStorage.getItem("user"))?.token;

   useEffect(() => {
      fetchEquipment();
   }, []);

   const fetchEquipment = async () => {
      try {
         const response = await axios.get(`${API_BASE_URL}/equipment`);
         setEquipment(response.data);
      } catch (error) {
         console.error("Error fetching equipment:", error);
      }
   };

   const handleEdit = (equip) => {
      setEditing(equip);
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this equipment?")) return;

      try {
         await axios.delete(`${API_BASE_URL}/delete-equipment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         fetchEquipment();
      } catch (error) {
         console.error("Error deleting equipment:", error);
      }
   };

   const handleSaveEdit = async () => {
      try {
         await axios.put(
            `${API_BASE_URL}/modify-equipment/${editing.equipment_id}`,
            editing,
            { headers: { Authorization: `Bearer ${token}` } }
         );
         setEditing(null);
         fetchEquipment();
      } catch (error) {
         console.error("Error updating equipment:", error);
      }
   };

   const handleAddEquipment = async () => {
      try {
         await axios.post(`${API_BASE_URL}/add-equipment`, newEquipment, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setNewEquipment({ name: "", description: "", price: "", quantity: "" });
         fetchEquipment();
      } catch (error) {
         console.error("Error adding equipment:", error);
      }
   };

   return (
      <div className="container mx-auto p-6">
         <h2 className="text-2xl font-bold my-4 ml-28 ">Admin Dashboard - Equipment List</h2>
         <div className="overflow-x-auto mx-auto flex justify-center rounded">
            <table className="table-auto w-[85%]  border-collapse bg-white ">
               <thead>
                  <tr className="bg-gray-300 border border-gray-300 ">
                     <th className="p-2 w-[5%]">ID</th>
                     <th className="p-2 w-[20%]">Name</th>
                     <th className="p-2 w-[35%]">Description</th>
                     <th className="p-2 w-[10%]">Price (BDT)</th>
                     <th className="p-2 w-[10%]">Quantity</th>
                     <th className="p-2 w-[10%]">ImageURL</th>
                     <th className="p-2 w-[10%]">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {equipment.map((equip) => (
                     <tr key={equip.equipment_id} className="border-b border-gray-300">
                        <td className="p-2 text-center">{equip.equipment_id}</td>
                        <td className="p-2">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <input
                                 type="text"
                                 value={editing.name}
                                 onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                                 className="border rounded p-1 w-full"
                              />
                           ) : (
                              equip.name
                           )}
                        </td>
                        <td className="p-2">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <input
                                 type="text"
                                 value={editing.description}
                                 onChange={(e) =>
                                    setEditing({ ...editing, description: e.target.value })
                                 }
                                 className="border rounded p-1 w-full"
                              />
                           ) : (
                              equip.description
                           )}
                        </td>
                        <td className="p-2 ">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <input
                                 type="number"
                                 value={editing.price}
                                 onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                                 className="border rounded p-1 w-full"
                              />
                           ) : (
                              equip.price
                           )}
                        </td>
                        <td className="p-2 text-center">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <input
                                 type="number"
                                 value={editing.quantity}
                                 onChange={(e) =>
                                    setEditing({ ...editing, quantity: e.target.value })
                                 }
                                 className="border rounded p-1 w-full"
                              />
                           ) : (
                              equip.quantity
                           )}
                        </td> 
                        <td className="p-2 ">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <input
                                 type="text"
                                 value={editing.image_url}
                                 onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                                 className="border rounded p-1 w-full"
                              />
                           ) : (
                              <img src={equip.image_url} alt={equip.name} className="w-16 h-16 object-cover rounded-lg mx-auto" />
                           )}
                        </td>
                        <td className="p-2 flex justify-center gap-2">
                           {editing?.equipment_id === equip.equipment_id ? (
                              <button
                                 className="btn btn-success btn-sm"
                                 onClick={handleSaveEdit}
                              >
                                 Save
                              </button>
                           ) : (
                              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(equip)}>
                                 <FaEdit />
                              </button>
                           )}
                           <button
                              className="btn btn-error btn-sm"
                              onClick={() => handleDelete(equip.equipment_id)}
                           >
                              <FaTrash />
                           </button>
                        </td>
                     </tr>
                  ))}

                  {/* Add Equipment Row */}
                  <tr className="border-b border-gray-300">
                     <td className="p-2">+</td>
                     <td className="p-2">
                        <input
                           type="text"
                           value={newEquipment.name}
                           onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                           placeholder="New Name"
                           className="border rounded p-1 w-full"
                        />
                     </td>
                     <td className="p-2">
                        <input
                           type="text"
                           value={newEquipment.description}
                           onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
                           placeholder="New Description"
                           className="border rounded p-1 w-full"
                        />
                     </td>
                     <td className="p-2">
                        <input
                           type="number"
                           
                           value={newEquipment.price}
                           onChange={(e) => setNewEquipment({ ...newEquipment, price: e.target.value })}
                           placeholder="Price"
                           className="border rounded p-1 w-full"
                        />
                     </td>
                     <td className="p-2">
                        <input
                           type="number"
                           value={newEquipment.quantity}
                           onChange={(e) => setNewEquipment({ ...newEquipment, quantity: e.target.value })}
                           placeholder="Quantity"
                           className="border rounded p-1 w-full"
                        />
                     </td>
                     <td className="p-2">
                        <input
                           type="text"
                           value={newEquipment.image_url}
                           onChange={(e) => setNewEquipment({ ...newEquipment, image_url: e.target.value })}
                           placeholder="Image URL"
                           className="border rounded p-1 w-full"
                        />
                     </td>
                     <td className="p-2 text-center">
                        <button className="btn btn-primary btn-sm" onClick={handleAddEquipment}>
                           <FaPlus />
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AdminPage;
