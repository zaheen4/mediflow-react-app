import {
   createBrowserRouter,

} from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import WelcomePage from "../components/Home/WelcomePage";
import DummyPage from "../components/Dummy/DummyPage";
import Register from "../components/Register/Regsiter";
import BuyEquipment from "../components/Euipment/BuyEquipment";
import About from "../components/About/About";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
      children: [
         {
            path: "/",
            element: <WelcomePage />,
         },
         {
            path: "/login",
            element: <Login />,

         },
         {
            path: "/register",
            element: <Register />,
         },

         {
            path: "/dummypage",
            element: <DummyPage />,
         },
         {
            path: "/buyequipment",
            element: <BuyEquipment/>,
         },

         {
            path: "/about",
            element: <About/>,
         },



      ],

   },
]);

