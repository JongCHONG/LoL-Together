import DashboardStyles from "./Dashboard.module.scss";

import { useUser } from "../../contexts/UserContext";

import Menu from "../../components/Menu/Menu";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import UserInfos from "../../components/UserInfos/UserInfos";
import Announces from "../../components/Announces/Announces";

const Dashboard = () => {
  const { currentUser } = useUser();

  return (
    <>
      <Menu />
      <div className={DashboardStyles.banner}>
        <h1 className={DashboardStyles.title}>
          Bienvenue, {currentUser?.riot_id || currentUser?.email}
        </h1>
      </div>
      <div className={DashboardStyles.container}>
        <UserSidebar
          riotId={currentUser?.riot_id}
          tagline={currentUser?.tagline}
          riotInfos={currentUser?.riot_infos}
        />
        <div className={DashboardStyles.content}>
          <UserInfos />
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
