import { createContext, useContext } from "react";
import { useUser, useAuthStateListener } from "../hooks/useAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, isLoading, error } = useUser();
  useAuthStateListener(); // Listen for auth state changes

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
