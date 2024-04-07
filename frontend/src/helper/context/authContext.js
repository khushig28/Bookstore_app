// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Additional state for admin status

  useEffect(() => {
    // Check if user is logged in from persistent storage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const adminStatus = localStorage.getItem('isAdmin');
    setIsLoggedIn(loggedInStatus === 'true');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const login = () => {
       setIsLoggedIn(true);
    // Store login status in local storage
    localStorage.setItem('isLoggedIn', true);
  };

  const logout = () => {
    // Perform your logout logic here
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Remove login status from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    // Store admin status in local storage
    localStorage.setItem('isAdmin', status);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin, setAdminStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
