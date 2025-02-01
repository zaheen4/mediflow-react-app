// src/components/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
   const [formData, setFormData] = useState({
      username: "",
      password: "",
      role: "User",  // Default role
      email: "",
   });

   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {

      e.preventDefault();
      setErrorMessage(""); // Clear previous errors
      setSuccessMessage(""); // Clear previous success message

      try {
         const response = await axios.post("http://localhost:5000/register", formData, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         setSuccessMessage(response.data.message);
         setFormData({
            username: "",
            password: "",
            role: "User",
            email: "",
         });

         // toast.success("Registration Successful!");

         toast.success('Registration Successful!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
         });


         setTimeout(() => {
            navigate("/login");
         }, 2000);

      } catch (error) {
         if (error.response) {
            setErrorMessage(error.response.data.error || "Registration failed!");
            console.log(error);
         } else {
            setErrorMessage("An error occurred!");
         }
      }


   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="max-w-sm w-full p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            {errorMessage && (
               <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}
            {successMessage && (
               <div className="text-green-500 text-center mb-4">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     value={formData.username}
                     onChange={handleChange}
                     required
                     className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     required
                     className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700">Role</label>
                  <select
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     required
                     className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  >
                     <option value="User">User</option>
                     <option value="Admin">Admin</option>
                  </select>
               </div>
               <div className="flex justify-center">
                  <button
                     type="submit"
                     className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition={Bounce}
         />
      </div>
   );
};

export default Register;
