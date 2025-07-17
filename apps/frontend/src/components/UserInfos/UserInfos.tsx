import { useState } from "react";
import { LiaEdit } from "react-icons/lia";

import { useUser } from "../../contexts/UserContext";

import UserInfosStyles from "./UserInfos.module.scss";
import Modal from "../Modal/Modal";


const UserInfos = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const languages = user?.languages?.length ? user.languages.join(", ") : "N/A";
  const availabilities = user?.availabilities?.length
    ? user.availabilities.join(", ")
    : "N/A";
  const roles = user?.roles?.length ? user.roles.join(", ") : "N/A";
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
