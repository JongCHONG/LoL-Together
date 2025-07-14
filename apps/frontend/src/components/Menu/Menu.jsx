import React from "react";
import Link from "next/link";
import MenuStyles from "./Menu.module.scss";

const Menu = () => {
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
          <Link href="/auth/login">Connexion</Link>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <Link href="/auth/signup">Inscription</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;