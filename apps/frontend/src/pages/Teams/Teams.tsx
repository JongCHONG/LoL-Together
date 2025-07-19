import TeamsStyles from "./Teams.module.scss";

import Menu from "../../components/Menu/Menu";

const Teams = () => {
  return (
    <>
      <Menu />
      <div className={TeamsStyles.banner}>
        <h1 className={TeamsStyles.title}>Rejoindre une équipe</h1>
      </div>
    </>
  );
};

export default Teams;
