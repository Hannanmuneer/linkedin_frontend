import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// Backend API Base URL
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Page refresh hone par user local storage se load ho jaye
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 1. SIGNUP FUNCTION (Connects to POST /create)
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

      // Token aur user details ko localStorage mein save karein
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
      // Backend se aane wala error message throw karein
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  };

  // 2. LOGIN FUNCTION (Connects to POST /login)
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      const { token, user: userData } = response.data;

      // Token aur user details save karein
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      return null; // Null means no error
    } catch (error) {
      // Agar password wrong ho ya user na mile to error text return karein
      return error.response?.data?.message || "Invalid email or password";
    }
  };

  // 3. LOGOUT FUNCTION
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