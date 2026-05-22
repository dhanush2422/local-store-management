import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Set token in axios headers if it exists
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      verifyToken();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyToken = async () => {
    try {
      const res = await api.get("/auth/verify");
      setUser(res.data.user);
      setLoading(false);
    } catch (error) {
      // Only logout if token is invalid (401), not if backend is down
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      } else {
        // Backend might be down or network error - don't clear token, just set loading to false
        console.warn("Could not verify token:", error.message);
        setUser(null);
      }
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: newToken, user: userData } = res.data;
      
      localStorage.setItem("token", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return {
          success: false,
          message: "Cannot connect to server. Please make sure the backend is running.",
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const register = async (username, email, password, shopName) => {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
        shopName,
      });
      const { token: newToken, user: userData } = res.data;
      
      localStorage.setItem("token", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return {
          success: false,
          message: "Cannot connect to server. Please make sure the backend is running.",
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
