import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Home = () => {
   return (
      <div>
         <Navbar></Navbar>

         <div className="container mx-auto min-h-screen">
            <Outlet></Outlet>
         </div>

         <Footer></Footer>
      </div>
   );
};

export default Home;