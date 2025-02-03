import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import user_icon from "../../assets/user_icon.svg"



const Navbar = () => {
   const { user, logout } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation(); // Get current URL path





   const handleLogout = () => {
      logout();
      toast.info('Logged out!', {
         position: "top-right",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: false,
         draggable: false,
         progress: undefined,
         theme: "light",
         // transition: Bounce,
      });


      navigate("/login");


   };

   // Function to check if a menu item is active
   const isActive = (path) =>
      location.pathname === path ? "btn btn-error text-white" : "btn btn-ghost";

   // Common menu structure
   const renderMenuItems = () => (
      <>
         <li className="w-25">
            <Link to="/" className={isActive("/")}>Home</Link>
         </li>
         {user?.role === "Admin" ? (
            <li className="w-25">
               <Link to="/admin-dashboard" className={isActive("/admin-dashboard")}>Dashboard</Link>
            </li>
         ) : user?.role === "User" ? (
            <li className="w-25">
               <Link to="/buy-equipment" className={isActive("/buy-equipment")}>Shop</Link>
            </li>
         ) : null}
         <li className="w-25">
            <Link to="/services" className={isActive("/services")}>Service</Link>
         </li>
         <li className="w-25">
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
               <div className="btn btn-outline btn-primary w-24 mr-2">
                  <FaCartShopping /> Cart
               </div>
            ) : null}

            {user ? (
               <div className="dropdown dropdown-end mr-2">
                  <div tabIndex={0} className="btn btn-ghost flex items-center gap-2">
                     <img
                        src={user_icon}
                        alt="User Icon"
                        className="w-8 h-8 rounded-full"
                     />
                     <span>{user.username}</span>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content mt-3 w-44 bg-gray-200 p-2 shadow rounded-box"
                  >

                     <li>
                        <div className="flex items-center gap-2">
                           <img
                              src={user_icon}
                              alt="User Icon"
                              className="w-8 h-8 rounded-full"
                           />
                           <span className="text-[14px]">{user.role}</span>
                        </div>
                     </li>
                     <li>
                        <button onClick={handleLogout} className="btn btn-outline btn-error w-full mt-2 text-[14px]">
                           Logout
                        </button>
                     </li>

                  </ul>
               </div>
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
         />


      </div>
   );
};

export default Navbar;
