import { formatAvailabilities } from "../../utils/helpers/formatAvailabilities";
import { formatLanguages } from "../../utils/helpers/formatLanguages";
import { Availabilities } from "../../utils/types/api";
import TeamInfosStyles from "./TeamInfos.module.scss";
import { LiaEdit } from "react-icons/lia";

interface TeamInfosProps {
  languages: string[];
  availabilities: Availabilities;
}

const TeamInfos = ({ languages, availabilities }: TeamInfosProps) => {
  const formattedLanguages = formatLanguages(languages);
  const formattedAvailabilities = formatAvailabilities({ availabilities });

  return (
    <div className={TeamInfosStyles.container}>
      <div className={TeamInfosStyles.header}>
        <h3 className={TeamInfosStyles.title}>Informations</h3>
        {/* {currentUser?._id === profileData?._id && (
          <LiaEdit
            onClick={() => setOpen(true)}
            size={24}
            title="Modifier les informations"
            cursor={"pointer"}
            color="gold"
          />
        )} */}
      </div>
      <div>Langue(s) : {formattedLanguages}</div>
      <div>Disponibilité(s) : {formattedAvailabilities}</div>
    </div>
  );
};

export default TeamInfos;
