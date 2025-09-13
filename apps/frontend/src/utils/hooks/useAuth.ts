import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      
      if (token && !isExpired(token)) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    const intervalId = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token && isExpired(token)) {
        console.log("Token expiré détecté");
        checkAuthStatus();
      }
    }, 60000);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const token = localStorage.getItem("authToken");

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
  };

    const refreshAuth = () => {
    checkAuthStatus();
  };

  return { 
    token,
    isAuthenticated, 
    isLoading, 
    refreshAuth,
    logout,
    checkAuthStatus
  };
};