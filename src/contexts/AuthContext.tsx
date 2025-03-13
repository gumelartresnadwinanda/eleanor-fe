import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { ADAM_BASE_URL } from "../config";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${ADAM_BASE_URL}/auth/me`, { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && (error.response.status === 401 || error.response.status === 403)) {
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${ADAM_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      document.cookie = "eleanor_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
