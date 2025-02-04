import welcome_bg from "../../assets/pngtree—pink medical equipment banner background_968645.jpg"
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Home = () => {
   return (
      <div>
         <Navbar></Navbar>

         <div className="mx-auto">
            {/* <img src={welcome_bg} alt="" className="h-[720px] object-cover" /> */}
            <Outlet></Outlet>
         </div>

         <Footer></Footer>
      </div>
   );
};

export default Home;