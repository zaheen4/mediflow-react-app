import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import login_image from "../../assets/pawel-czerwinski-3Fr2AJHAOjc-unsplash.jpg"
import login_image2 from "../../assets/luke-chesser-CxBx_J3yp9g-unsplash.jpg"

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const { login } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
         });

         const data = await response.json();

         if (response.ok) {
            login(data); // Store user info in AuthContext

            // Redirect based on user role
            if (data.role === "Admin") {
               navigate("/");
            } else if (data.role === "User") {
               navigate("/");
            } else {
               navigate("/"); // Default redirection
            }
         } else {
            setError(data.error || "Login failed");
         }

      } catch {
         setError("Network error");
      }
   };




   return (
      <div>
         <div className="hero bg-base-200 min-h-screen">
         
         <img  src={login_image2} alt="" className="h-[860px] w-[100%] "/>
            <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="w-[48%] text-center lg:text-left text-white">
                  <h1 className="text-5xl font-bold ">Welcome to MediFlow!!</h1>
                  <p className="py-6">
                     Log in to access your account and explore our wide range of medical equipment solutions. Your journey to
                     better healthcare starts here.
                  </p>
               </div>
               <div className="card  w-full max-w-sm shrink-0 shadow-[0px_0px_30px_rgba(0,0,0,0.3)] rounded-2xl">
                  <form className="card-body " onSubmit={handleLogin}>
                     <div className="form-control text-">
                        <label className="label"><span className="label-text font-bold text-white">Username</span></label>
                        <input type="text" placeholder="Enter username" className="input input-bordered"
                           value={username} onChange={(e) => setUsername(e.target.value)} required />
                     </div>
                     <div className="form-control">
                        <label className="label"><span className="label-text font-bold text-white">Password</span></label>
                        <input type="password" placeholder="Password" className="input input-bordered"
                           value={password} onChange={(e) => setPassword(e.target.value)} required />
                     </div>
                     {error && <p className="text-red-500">{error}</p>}
                     <div className="form-control mt-6">
                        <button type="submit" className="btn bg-[#ff7537] border-none hover:bg-[#c1006c] shadow-xl text-white w-20">Login</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>

   );
};

export default Login;
