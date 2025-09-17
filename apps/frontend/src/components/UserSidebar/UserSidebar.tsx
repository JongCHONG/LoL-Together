import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";

import UserSidebarStyles from "./UserSidebar.module.scss";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import defaultAvatar from "../../assets/default-avatar.png";
import { useUser } from "../../contexts/UserContext";

import { QueueType } from "../../utils/enums/queueType";
import { RiotInfos, User } from "../../utils/types/api";
import { getEmblemByTierRank } from "../../utils/helpers/getEmblemByTierRank";
import { formatGameEndTime } from "../../utils/helpers/formatGameEndTime";
import { deleteUser } from "../../utils/api/user";
import { useAuth } from "../../utils/hooks/useAuth";

interface SidebarProps {
  tagline?: User["tagline"];
  riotId?: User["riot_id"];
  riotInfos?: RiotInfos;
}

const UserSidebar = ({ riotInfos, riotId, tagline }: SidebarProps) => {
  const { currentUser } = useUser();
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteAccount = useCallback(async () => {
    await deleteUser(currentUser?._id || "", token ?? "");
    setShowConfirmModal(false);
    logout();
    navigate("/");
  }, [currentUser?._id, navigate]);

  return (
    <>
      <div className={UserSidebarStyles.container}>
        <div
          className={UserSidebarStyles.content}
          data-tier={
            riotInfos?.tier ? riotInfos.tier.toUpperCase() : "UNRANKED"
          }
        >
          {riotInfos?.profileIconId ? (
            <img
              className={UserSidebarStyles.avatar}
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${riotInfos?.profileIconId}.png`}
              alt="avatar"
            />
          ) : (
            <img
              className={UserSidebarStyles.avatar}
              src={defaultAvatar}
              alt="avatar"
            />
          )}
          <h3>{riotId}</h3>
          {tagline ? <div>#{tagline}</div> : null}
          <div>Niveau : {riotInfos?.summonerLevel || "N/A"}</div>
          <div>Victoires : {riotInfos?.wins || 0}</div>
          <div>Défaites : {riotInfos?.losses || 0}</div>
          {riotInfos?.gameEndTimestamp && (
            <center>
              <div>
                Dernière partie : <br />
                {formatGameEndTime(riotInfos.gameEndTimestamp)}
              </div>
            </center>
          )}
          <div>
            {riotInfos?.tier && riotInfos?.rank && (
              <img
                src={getEmblemByTierRank(riotInfos?.tier) || undefined}
                alt="emblem"
                className={UserSidebarStyles.emblem}
              />
            )}
          </div>
        </div>
        {riotInfos?.tier && riotInfos?.rank && riotInfos?.queueType && (
          <div className={UserSidebarStyles.tierRankQueueType}>
            <div>
              {riotInfos?.tier || "N/A"} {riotInfos?.rank || "N/A"}
            </div>
            <div>
              {riotInfos?.queueType &&
                QueueType[riotInfos?.queueType as keyof typeof QueueType]}
            </div>
          </div>
        )}
        {!id && (
          <>
            <button
              className={UserSidebarStyles.createTeamButton}
              onClick={() => setOpen(true)}
            >
              Créer une équipe
            </button>
            <button
              className={UserSidebarStyles.deleteAccountButton}
              onClick={() => setShowConfirmModal(true)}
            >
              Supprimer mon compte
            </button>
          </>
        )}
      </div>
      <CreateTeamModal open={open} setOpen={setOpen} />
      {showConfirmModal && (
        <ConfirmModal
          onDeleteAccount={handleDeleteAccount}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
