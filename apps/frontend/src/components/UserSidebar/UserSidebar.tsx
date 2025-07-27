import { QueueType } from "../../utils/enums/queueType";
import { RiotInfos, User } from "../../utils/types/api";

import UserSidebarStyles from "./UserSidebar.module.scss";

import { getEmblemByTierRank } from "../../utils/helpers/getEmblemByTierRank";
import { formatGameEndTime } from "../../utils/helpers/formatGameEndTime";
import { useState } from "react";
import CreateTeamModal from "../CreateTeamModal/CreateTeamModal";

interface SidebarProps {
  tagline: User["tagline"];
  riotId: User["riot_id"];
  riotInfos: RiotInfos;
}

const UserSidebar = ({ riotInfos, riotId, tagline }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={UserSidebarStyles.container}>
        <div
          className={UserSidebarStyles.content}
          data-tier={riotInfos.tier ? riotInfos.tier.toUpperCase() : "UNRANKED"}
        >
          <img
            className={UserSidebarStyles.avatar}
            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${riotInfos.profileIconId}.png`}
            alt="avatar"
          />
          <h3>{riotId}</h3>
          <div>#{tagline}</div>
          <div>Niveau : {riotInfos.summonerLevel || "N/A"}</div>
          <div>Victoires : {riotInfos.wins || 0}</div>
          <div>Défaites : {riotInfos.losses || 0}</div>
          {riotInfos.gameEndTimestamp && (
            <center>
              <div>
                Dernière partie : <br />
                {formatGameEndTime(riotInfos.gameEndTimestamp)}
              </div>
            </center>
          )}
          <div>
            {riotInfos.tier && riotInfos.rank && (
              <img
                src={getEmblemByTierRank(riotInfos.tier) || undefined}
                alt="emblem"
                className={UserSidebarStyles.emblem}
              />
            )}
          </div>
        </div>
        <div className={UserSidebarStyles.tierRankQueueType}>
          <div>
            {riotInfos.tier || "N/A"} {riotInfos.rank || "N/A"}
          </div>
          <div>
            {riotInfos?.queueType &&
              QueueType[riotInfos.queueType as keyof typeof QueueType]}
          </div>
        </div>
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
