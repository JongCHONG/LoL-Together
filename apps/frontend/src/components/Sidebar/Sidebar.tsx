import { QueueType } from "../../utils/enums/queueType";
import { RiotInfos, User } from "../../utils/types/api";

import SidebarStyles from "./Sidebar.module.scss";

import { getEmblemByTierRank } from "../../utils/helpers/getEmblemByTierRank";
import { formatGameEndTime } from "../../utils/helpers/formatGameEndTime";

interface SidebarProps {
  tagline: User["tagline"];
  riotId: User["riot_id"];
  riotInfos: RiotInfos;
}

const Sidebar = ({ riotInfos, riotId, tagline }: SidebarProps) => {
  return (
    <div className={SidebarStyles.container}>
      <div
        className={SidebarStyles.content}
        data-tier={riotInfos.tier ? riotInfos.tier.toUpperCase() : "UNRANKED"}
      >
        <img
          className={SidebarStyles.avatar}
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
              className={SidebarStyles.emblem}
            />
          )}
        </div>
      </div>
      <div className={SidebarStyles.tierRankQueueType}>
        <div>
          {riotInfos.tier || "N/A"} {riotInfos.rank || "N/A"}
        </div>
        <div>
          {riotInfos?.queueType &&
            QueueType[riotInfos.queueType as keyof typeof QueueType]}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
