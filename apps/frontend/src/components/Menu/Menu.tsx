import MenuStyles from "./Menu.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Menu = () => {
  const isLoggedIn = useAuth();

  console.log("Menu component rendered, isLoggedIn:", isLoggedIn);

  return (
    <nav>
      <ul className={MenuStyles.menu_container}>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/">Accueil</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/players">Joueurs</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link to="/teams">Teams</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isLoggedIn ? (
            <Link to="/dashboard">Mon compte</Link>
          ) : (
            <Link to="/login">Connexion</Link>
          )}
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isLoggedIn ? (
            <Link to="">Déconnexion</Link>
          ) : (
            <Link to="/register">Inscription</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
