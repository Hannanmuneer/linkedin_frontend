import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);


const API_URL = import.meta.env.VITE_API_URL || "https://linkedin-backend-kappa-five.vercel.app"; 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
   
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  
  const signup = async ({ firstname, lastname, email, password, age }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, {
        firstname,
        lastname,
        email,
        password,
        age
      });

      const { token, user: userData } = response.data;

      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
     
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  };

 
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      const { token, user: userData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return null; 
    } catch (error) {
     
      return error.response?.data?.message || "Invalid email or password";
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);