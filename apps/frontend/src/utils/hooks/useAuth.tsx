import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("authToken");
      setIsLoggedIn(!!user);
    }
  }, []);

  return isLoggedIn;
};
