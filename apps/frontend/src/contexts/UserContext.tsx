import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../utils/types/api";
import { fetchUserById } from "../utils/api/user";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "../utils/types/auth";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      
      if (token) {
        const decodedToken = decodeToken(token) as DecodedToken;
        
        if (decodedToken?.userId) {
          const userData = await fetchUserById(decodedToken.userId);
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};