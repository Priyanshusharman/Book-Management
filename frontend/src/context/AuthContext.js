import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from cookie
    const loadUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/user/me', { withCredentials: true });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:8000/user/login', { email, password }, { withCredentials: true });
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('http://localhost:8000/user/register', { name, email, password }, { withCredentials: true });
    setUser(data.user);
  };


const logout = async () => {
  await axios.get('http://localhost:8000/user/logout', { withCredentials: true });

  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
