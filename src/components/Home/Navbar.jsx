import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/Context/AuthContext";

const Navbar = () => {
   const { user, logout } = useContext(AuthContext);

   return (
      <div className="navbar bg-base-300">
         {/* Navbar Start */}
         <div className="navbar-start">
            <div className="dropdown">
               <button tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </button>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
               >
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  {user?.role === "Admin" ? (
                     <li>
                        <Link to="/view-equipment">View Equipment</Link>
                     </li>
                  ) : user?.role === "User" ? (
                     <li>
                        <Link to="/buy-equipment">Buy Equipment</Link>
                     </li>
                  ) : null}
                  <li>
                     <Link to="/pages/services">Service</Link>
                  </li>
                  <li>
                     <Link to="/pages/about">About</Link>
                  </li>
               </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
               MediFlow
            </Link>
         </div>

         {/* Navbar Center */}
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
               <li>
                  <Link to="/">Home</Link>
               </li>
               {user?.role === "Admin" ? (
                  <li>
                     <Link to="/view-equipment">View Equipment</Link>
                  </li>
               ) : user?.role === "User" ? (
                  <li>
                     <Link to="/buy-equipment">Buy Equipment</Link>
                  </li>
               ) : null}
               <li>
                  <Link to="/pages/services">Service</Link>
               </li>
               <li>
                  <Link to="/pages/about">About</Link>
               </li>
            </ul>
         </div>

         {/* Navbar End */}
         <div className="navbar-end">
            {user ? (
               <button
                  onClick={() => {
                     logout();
                  }}
                  className="btn btn-outline btn-error w-24"
               >
                  LOGOUT
               </button>
            ) : (
               <>
                  <Link to="/login" className="btn mr-2 btn-outline btn-success w-24">
                     LOGIN
                  </Link>
                  <Link to="/register" className="btn mr-2 btn-outline btn-error w-24">
                     REGISTER
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default Navbar;
