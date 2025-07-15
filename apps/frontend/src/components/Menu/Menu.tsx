import MenuStyles from "./Menu.module.scss";
import { useAuth } from "../../utils/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { isAuthenticated, isLoading, refreshAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    refreshAuth(); // Force la mise à jour de l'état d'auth
    navigate("/"); 
  };

  if (isLoading) {
    return null; 
  }

  return (
    <nav>
      <ul className={MenuStyles.menu_container}>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/">Accueil</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/users">Joueurs</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/teams">Teams</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isAuthenticated ? (
            <Link to="/dashboard">Mon compte</Link>
          ) : (
            <Link to="/login">Connexion</Link>
          )}
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                fontFamily: "inherit",
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "inherit",
              }}
            >
              Déconnexion
            </button>
          ) : (
            <Link to="/register">Inscription</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
