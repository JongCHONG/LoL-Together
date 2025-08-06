import Menu from "../../components/Menu/Menu";
import DashboardStyles from "./Dashboard.module.scss";

import { useUser } from "../../contexts/UserContext";
import Sidebar from "../../components/UserSidebar/UserSidebar";
import UserInfos from "../../components/UserInfos/UserInfos";
import Announces from "../../components/Announces/Announces";

const Dashboard = () => {
  const { currentUser } = useUser();
  
  return (
    <>
      <Menu />
      <div className={DashboardStyles.banner}>
        <h1 className={DashboardStyles.title}>Bienvenue, {currentUser?.riot_id}</h1>
      </div>
      <div className={DashboardStyles.container}>
        {currentUser?.riot_infos && (
          <Sidebar
            riotId={currentUser.riot_id}
            tagline={currentUser.tagline}
            riotInfos={currentUser.riot_infos}
          />
        )}
        <div className={DashboardStyles.content}>
          {currentUser?.riot_infos && <UserInfos />}
          <Announces
            userId={currentUser?._id ?? ""}
            announces={currentUser?.announces ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
