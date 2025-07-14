import Menu from "../../components/Menu/Menu";
import DashboardStyles from "./Dashboard.module.scss";

import { useUser } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  console.log("Utilisateur connecté:", user);
  
  return (
    <>
      <Menu />
      <div className={DashboardStyles.banner}>
        <h1 className={DashboardStyles.title}>Bienvenue, {user?.riot_id}</h1>
      </div>
    </>
  );
};

export default Dashboard;
