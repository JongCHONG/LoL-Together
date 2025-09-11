import { useState } from "react";

import UserSidebarStyles from "./UserSidebar.module.scss";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";

import defaultAvatar from "../../assets/default-avatar.png";

import { QueueType } from "../../utils/enums/queueType";
import { RiotInfos, User } from "../../utils/types/api";
import { getEmblemByTierRank } from "../../utils/helpers/getEmblemByTierRank";
import { formatGameEndTime } from "../../utils/helpers/formatGameEndTime";

interface SidebarProps {
  tagline?: User["tagline"];
  riotId?: User["riot_id"];
  riotInfos?: RiotInfos;
}

const UserSidebar = ({ riotInfos, riotId, tagline }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);

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
        <button
          className={UserSidebarStyles.createTeamButton}
          onClick={() => setOpen(true)}
        >
          Créer une équipe
        </button>
      </div>
      <CreateTeamModal open={open} setOpen={setOpen} />
    </>
  );
};

export default UserSidebar;
