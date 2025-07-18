import { useState } from "react";
import { LiaEdit } from "react-icons/lia";

import { useUser } from "../../contexts/UserContext";

import UserInfosStyles from "./UserInfos.module.scss";
import Modal from "../Modal/Modal";
import { WeekDays } from "../../utils/enums/weekDays";
import { LolRole } from "../../utils/enums/lolRole";

const UserInfos = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const languages = user?.languages?.length ? user.languages.join(", ") : "N/A";
  const availabilities = user?.availabilities
    ? Object.entries(user.availabilities)
        .filter(([_, value]) => value)
        .map(([key]) => WeekDays[key as keyof typeof WeekDays] || key)
        .join(", ") || "N/A"
    : "N/A";

  const roles =
    user?.roles && typeof user.roles === "object"
      ? Object.entries(user.roles)
          .filter(([_, value]) => value)
          .map(([key]) => LolRole[key as keyof typeof LolRole] || key)
          .join(", ") || "N/A"
      : "N/A";
  const teams = user?.teams?.length
    ? user.teams.map((team) => team.name).join(", ")
    : "Aucune équipes";

  return (
    <>
      <div className={UserInfosStyles.container}>
        <div className={UserInfosStyles.header}>
          <h3 className={UserInfosStyles.title}>Informations</h3>
          <LiaEdit
            onClick={() => setOpen(true)}
            size={24}
            title="Modifier les informations"
            cursor={"pointer"}
            color="gold"
          />
        </div>
        <div className={UserInfosStyles.user_panel}>
          <div className={UserInfosStyles.user_info}>
            <div>Langue(s) : {languages}</div>
            <div>Disponibilité(s) : {availabilities}</div>
            <div>Rôle(s) : {roles}</div>
          </div>
          <div className={UserInfosStyles.user_info}>
            <div>Équipe(s) : {teams}</div>
            <div>Discord: {user?.discord}</div>
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} />
    </>
  );
};

export default UserInfos;
