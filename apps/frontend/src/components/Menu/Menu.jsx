import React from "react";
import Link from "next/link";
import MenuStyles from "./Menu.module.scss";
import { useAuth } from "@/hooks/useAuth";

const Menu = () => {
  const isLoggedIn = useAuth();

  console.log("Menu component rendered, isLoggedIn:", isLoggedIn);

  return (
    <nav>
      <ul className={MenuStyles.menu_container}>
        <li className={MenuStyles.menu_container_item}>
          <Link href="/">Accueil</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link href="/players">Joueurs</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link href="/teams">Teams</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isLoggedIn ? (
            <Link href="/dashboard">Mon compte</Link>
          ) : (
            <Link href="/auth/login">Connexion</Link>
          )}
        </li>
        <li className={MenuStyles.menu_container_item}>
          {isLoggedIn ? (
            <Link href="">Déconnexion</Link>
          ) : (
            <Link href="/auth/signup">Inscription</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
