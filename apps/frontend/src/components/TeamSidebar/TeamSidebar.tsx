import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import TeamSidebarStyles from "./TeamSidebar.module.scss";
import defaultAvatar from "../../assets/default-avatar.png";

import { Team } from "../../utils/types/api";
import { useUser } from "../../contexts/UserContext";
import { deleteTeam } from "../../utils/api/team";
import { useAuth } from "../../utils/hooks/useAuth";

interface TeamSidebarProps {
  id: string;
  email?: string;
  logo?: string;
  leader: Team["leader"];
  name: string;
  createdAt: string;
  userCount: number;
}

const TeamSidebar = ({
  id,
  email,
  logo,
  leader,
  name,
  createdAt,
  userCount,
}: TeamSidebarProps) => {
  const { currentUser } = useUser();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDeleteTeam = useCallback(async (id: string) => {
    await deleteTeam(id, token ?? "");
    navigate("/dashboard");
  }, [token, navigate]);

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
              {leader.riot_id || email}
            </Link>
          </p>
        )}
        <p className={TeamSidebarStyles.createdAt}>
          Crée le : {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className={TeamSidebarStyles.userCount}>Membres : {userCount}</p>
        {currentUser && currentUser._id === leader?._id && (
          <button
            className={TeamSidebarStyles.deleteTeamButton}
            onClick={() => handleDeleteTeam(id)}
          >
            Supprimer mon équipe
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamSidebar;
