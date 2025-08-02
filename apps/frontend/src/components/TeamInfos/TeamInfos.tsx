import { useState } from "react";
import { formatAvailabilities } from "../../utils/helpers/formatAvailabilities";
import { formatLanguages } from "../../utils/helpers/formatLanguages";
import { Availabilities } from "../../utils/types/api";
import TeamInfosStyles from "./TeamInfos.module.scss";
import { LiaEdit } from "react-icons/lia";
import { useUser } from "../../contexts/UserContext";
import TeamInfosModal from "../TeamInfosModal/TeamInfosModal";

interface TeamInfosProps {
  leaderId: string;
  languages: string[];
  availabilities: Availabilities;
  description?: string;
  discord?: string;
  region?: string[];
  status?: string;
  website?: string;
  users?: any[];
}

const TeamInfos = ({
  leaderId,
  languages,
  availabilities,
  description,
  discord,
  region,
  status,
  website,
  users,
}: TeamInfosProps) => {
  const formattedLanguages = formatLanguages(languages);
  const formattedAvailabilities = formatAvailabilities({ availabilities });
  const [open, setOpen] = useState<boolean>(false);
  const { currentUser } = useUser();

  return (
    <>
      <div className={TeamInfosStyles.container}>
        <div className={TeamInfosStyles.header}>
          <h3 className={TeamInfosStyles.title}>Informations</h3>
          {currentUser?._id === leaderId && (
            <LiaEdit
              onClick={() => setOpen(true)}
              size={24}
              title="Modifier les informations"
              cursor={"pointer"}
              color="gold"
            />
          )}
        </div>
        <div className={TeamInfosStyles.team_panel}>
          <div className={TeamInfosStyles.team_info}>
            <div>Langue(s) : {formattedLanguages}</div>
            <div>Disponibilité(s) : {formattedAvailabilities}</div>
            <div>Discord : {discord}</div>
          </div>
          <div className={TeamInfosStyles.team_info}>
            {region && region.length > 0 ? (
              <div>Région : {region.join(", ")}</div>
            ) : (
              <div>Région : N/A</div>
            )}
            <div>Status : {status}</div>
            <div>Site web : {website}</div>
          </div>
        </div>
        <div>
          Membres :
          {users && users.length > 0
            ? users.map((user, index) => (
                <span key={index}>{user.riot_id || "N/A"}</span>
              ))
            : "Aucun membre"}
        </div>
        <div>Description : {description}</div>
      </div>

      <TeamInfosModal
        open={open}
        setOpen={setOpen}
        languages={languages}
        availabilities={availabilities}
        region={region}
        status={status}
        discord={discord}
        website={website}
      />
    </>
  );
};

export default TeamInfos;
