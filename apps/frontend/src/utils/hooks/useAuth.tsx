import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    // Écouter les changements du localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fonction pour forcer la mise à jour de l'état d'auth
  const refreshAuth = () => {
    checkAuthStatus();
  };

  return { isAuthenticated, isLoading, refreshAuth };
};