import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   // Load user from localStorage on startup
   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         const parsedUser = JSON.parse(storedUser);
         setUser({ role: parsedUser.role, token: parsedUser.token });
      }
   }, []);

   const login = (userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser({ role: userData.role, token: userData.token });
   };

   const logout = () => {
      localStorage.removeItem("user");
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
