import { QueueType } from "../../utils/enums/queueType";
import { User } from "../../utils/types/api";

import SidebarStyles from "./Sidebar.module.scss";

import { getEmblemByTierRank } from "../../utils/helpers/getEmblemByTierRank";

interface SidebarProps {
  riotInfos: User["riot_infos"]; // Utilise le type riot_infos du User
}

const Sidebar = ({ riotInfos }: SidebarProps) => {
  return (
    <div className={SidebarStyles.container}>
      <img
        className={SidebarStyles.avatar}
        src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${riotInfos.profileIconId}.png`}
        alt="avatar"
      />
      <div>Niveau : {riotInfos.summonerLevel || "N/A"}</div>
      <div>Victoires : {riotInfos.wins || 0}</div>
      <div>Défaites : {riotInfos.losses || 0}</div>
      <div>
        {riotInfos?.queueType &&
          QueueType[riotInfos.queueType as keyof typeof QueueType]}
      </div>
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
  );
};

export default Sidebar;
