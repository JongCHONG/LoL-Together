import { useState } from "react";
import { LiaEdit } from "react-icons/lia";

import { useUser } from "../../contexts/UserContext";

import UserInfosStyles from "./UserInfos.module.scss";
import UserInfosModal from "../UserInfosModal/UserInfosModal";
import { WeekDays } from "../../utils/enums/weekDays";
import { LolRole } from "../../utils/enums/lolRole";
import { getRoleIconByRole } from "../../utils/helpers/getRoleIconByRole";
import { User } from "../../utils/types/api";

interface UserInfosProps {
  userProfile?: User | null;
}

const UserInfos = ({ userProfile }: UserInfosProps) => {
  const { currentUser } = useUser();
  const [open, setOpen] = useState(false);
  const profileData = userProfile || currentUser;

  const languages = profileData?.languages?.length
    ? profileData.languages.join(", ")
    : "N/A";
  const availabilities = profileData?.availabilities
    ? Object.entries(profileData.availabilities)
        .filter(([_, value]) => value)
        .map(([key]) => WeekDays[key as keyof typeof WeekDays] || key)
        .join(", ") || "N/A"
    : "N/A";

  const roles =
    profileData?.roles && typeof profileData.roles === "object"
      ? Object.entries(profileData.roles)
          .filter(([_, value]) => value)
          .map(([key]) => {
            const roleName = LolRole[key as keyof typeof LolRole] || key;
            const RoleIcon = getRoleIconByRole(key as keyof typeof LolRole);
            return (
              <span key={key} className={UserInfosStyles.role}>
                {RoleIcon && (
                  <img
                    src={RoleIcon}
                    alt={roleName}
                    className={UserInfosStyles.img}
                  />
                )}
                {roleName}
              </span>
            );
          })
      : "N/A";

  const teams = profileData?.teams?.length
    ? profileData.teams.map((team) => team.name).join(", ")
    : "Aucune équipes";

  return (
    <>
      <div className={UserInfosStyles.container}>
        <div className={UserInfosStyles.header}>
          <h3 className={UserInfosStyles.title}>Informations</h3>
          {currentUser?._id === profileData?._id && (
            <LiaEdit
              onClick={() => setOpen(true)}
              size={24}
              title="Modifier les informations"
              cursor={"pointer"}
              color="gold"
            />
          )}
        </div>
        <div className={UserInfosStyles.user_panel}>
          <div className={UserInfosStyles.user_info}>
            <div>Langue(s) : {languages}</div>
            <div>Disponibilité(s) : {availabilities}</div>
            <div>Rôle(s) : {roles}</div>
          </div>
          <div className={UserInfosStyles.user_info}>
            <div>Équipe(s) : {teams}</div>
            <div>Discord: {profileData?.discord}</div>
          </div>
        </div>
      </div>

      <UserInfosModal open={open} setOpen={setOpen} />
    </>
  );
};

export default UserInfos;
