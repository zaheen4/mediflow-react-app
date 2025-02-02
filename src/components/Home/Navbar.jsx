import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";



const Navbar = () => {
   const { user, logout } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation(); // Get current URL path





   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   // Function to check if a menu item is active
   const isActive = (path) =>
      location.pathname === path ? "btn btn-error text-white" : "btn btn-ghost";

   // Common menu structure
   const renderMenuItems = () => (
      <>
         <li>
            <Link to="/" className={isActive("/")}>Home</Link>
         </li>
         {user?.role === "Admin" ? (
            <li>
               <Link to="/admin-dashboard" className={isActive("/admin-dashboard")}>Admin Dashboard</Link>
            </li>
         ) : user?.role === "User" ? (
            <li>
               <Link to="/buy-equipment" className={isActive("/buy-equipment")}>Buy Equipment</Link>
            </li>
         ) : null}
         <li>
            <Link to="/services" className={isActive("/services")}>Service</Link>
         </li>
         <li>
            <Link to="/about" className={isActive("/about")}>About</Link>
         </li>
      </>
   );

   return (
      <div className="navbar bg-base-300">
         {/* Navbar Start */}
         <div className="navbar-start">
            {/* Mobile Dropdown */}
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
               <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  {renderMenuItems()}
               </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
               MediFlow
            </Link>
         </div>

         {/* Navbar Center */}
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{renderMenuItems()}</ul>
         </div>

         {/* Navbar End */}
         <div className="navbar-end">


            {location.pathname === "/buy-equipment" && user ? (
               <Link to="/cart" className="btn btn-outline btn-primary w-24 mr-2">
                  <FaCartShopping /> Cart
               </Link>
            ) : null}



            {user ? (
               <button onClick={handleLogout} className="btn btn-outline btn-error w-24">
                  LOGOUT
               </button>
            ) : (
               <>
                  <Link to="/login" className="btn btn-outline btn-primary mr-2 w-24">
                     LOGIN
                  </Link>
                  <Link to="/register" className="btn btn-outline btn-primary mr-2 w-24">
                     REGISTER
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};

export default Navbar;
