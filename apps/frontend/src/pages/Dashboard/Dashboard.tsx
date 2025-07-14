import Menu from "../../components/Menu/Menu";
import DashboardStyles from "./Dashboard.module.scss";

import { useUser } from "../../contexts/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  const { user } = useUser();

  console.log("Utilisateur connecté:", user);
  
  return (
    <>
      <Menu />
      <div className={DashboardStyles.banner}>
        <h1 className={DashboardStyles.title}>Bienvenue, {user?.riot_id}</h1>
      </div>
      <div className={DashboardStyles.container}>
        {user?.riot_infos && <Sidebar riotInfos={user.riot_infos}/>}
      </div>
    </>
  );
};

export default Dashboard;
