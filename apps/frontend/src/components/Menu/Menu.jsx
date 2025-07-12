import React from "react";

import MenuStyles from "./Menu.module.scss";

const Menu = () => {
  return (
    <nav>
      <ul className={MenuStyles.menu_container}>
        <li className={MenuStyles.menu_container_item}>
          <a href="/">Accueil</a>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <a href="/">Joueurs</a>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <a href="/">Teams</a>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <a href="/auth/login">Connexion</a>
        </li>
        <li className={MenuStyles.menu_container_item}>
          <a href="/signup">Inscription</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
