import { Link } from "react-router-dom";

import TeamSidebarStyles from "./TeamSidebar.module.scss";
import defaultAvatar from "../../assets/default-avatar.png";

import { Team } from "../../utils/types/api";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../contexts/UserContext";

interface TeamSidebarProps {
  logo?: string;
  leader: Team["leader"];
  name: string;
  createdAt: string;
  userCount: number;
}

const TeamSidebar = ({
  logo,
  leader,
  name,
  createdAt,
  userCount,
}: TeamSidebarProps) => {
  const { currentUser } = useUser();

  return (
    <div className={TeamSidebarStyles.container}>
      <div>
        <img
          className={TeamSidebarStyles.logo}
          src={logo ?? defaultAvatar}
          alt={`${name} logo`}
        />
      </div>
      <div className={TeamSidebarStyles.info}>
        <h3>{name}</h3>
        {leader && (
          <p className={TeamSidebarStyles.leader}>
            Chef :
            <Link
              to={
                currentUser && currentUser._id === leader._id
                  ? `/dashboard`
                  : `/user/${leader._id}`
              }
              className={TeamSidebarStyles.leaderLink}
            >
              {leader.riot_id}
            </Link>
          </p>
        )}
        <p className={TeamSidebarStyles.createdAt}>
          Crée le : {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className={TeamSidebarStyles.userCount}>Membres : {userCount}</p>
      </div>
    </div>
  );
};

export default TeamSidebar;
