import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signIn, signUp } from "../services/users-services";
import { jwtDecode } from "jwt-decode";

interface IUserData {
  id: string | null;
  email: string | null;
  img: string | null;
  exp?: number | null;
  iat?: number | null;
  username: string | null;
  votes: {
    liked: string[];
    disliked: string[];
  };
  status: string;
  preferences: string[];
}

interface IAuthData {
  email: string;
  password: string;
  username?: string;
  repeatPassword?: string;
}

export const AuthContext = createContext<{
  error: string | null;
  user: IUserData | null;
  login: (authData: IAuthData) => Promise<void>;
  register: (authData: IAuthData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: IUserData) => void;
}>({
  error: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const storedSession = sessionStorage.getItem("session");

  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUserData | null>(
    storedSession ? jwtDecode(JSON.parse(storedSession)) : null
  );

  const refreshUserData = async () => {
    if (!storedSession) return;

    try {
      const freshUserData = await getCurrentUser();
      if (freshUserData) {
        updateUser(freshUserData);
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const login = async (authData: IAuthData) => {
    const { data, error } = await signIn(authData);

    if (error) {
      setError(error);
      return;
    }

    setUser(jwtDecode(data.accessToken));
    sessionStorage.setItem("session", JSON.stringify(data.accessToken));
    navigate("/");
  };

  const register = async (authData: IAuthData) => {
    const { data, error } = await signUp(authData);
    if (error) {
      setError(error);
      return;
    }

    setUser(jwtDecode(data.accessToken));
    sessionStorage.setItem("session", JSON.stringify(data.accessToken));
  };

  const logout = () => {
    sessionStorage.removeItem("session");
    setUser(null);
    navigate("/auth");
  };

  const updateUser = (userData: IUserData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
