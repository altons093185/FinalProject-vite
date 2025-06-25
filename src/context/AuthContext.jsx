// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  // ✅ 第一次進入網站，自動檢查登入狀態
  useEffect(() => {
    axios.get("http://localhost:8081/api/auth/checkLogin", {
      withCredentials: true
    }).then(async res => {
      if (res.data.data) {
        setIsLoggedIn(true);
        const userRes = await getUser();
        setUserName(userRes.data.userName);
        setRole(userRes.data.role);
      } else {
        setIsLoggedIn(false);
      }
    }).catch(() => {
      setIsLoggedIn(false);
    });
  }, []);

  // ✅ 登入功能（從 login 頁面呼叫）
  const login = async (formData) => {
    const res = await axios.post("http://localhost:8081/api/auth/login", formData, {
      withCredentials: true
    });
    if (res.data.status === 200) {
      setIsLoggedIn(true);
      const userRes = await getUser();
      setUserName(userRes.data.data.userName);
      setRole(userRes.data.data.role);
    }
    return res.data;
  };

  // ✅ 登出功能
  const logout = async () => {
    await axios.post("http://localhost:8081/api/auth/logout", {}, {
      withCredentials: true
    });
    setIsLoggedIn(false);
    setUserName("");
    setRole("");
  };

  const getUser = async () => {
    const userRes = await axios.get("http://localhost:8081/api/auth/getUser", {
      withCredentials: true
    });
    return userRes;

  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
