import { useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

import AnnounceModal from "../AnnouncesModal/AnnouncesModal";

import AnnouncesStyles from "./Announces.module.scss";

import { Announce, User } from "../../utils/types/api";
import { deleteAnnounce } from "../../utils/api/announces";
import { useUser } from "../../contexts/UserContext";

interface AnnouncesProps {
  userId: User["_id"];
  announces: Announce[];
}

const Announces = ({ userId, announces }: AnnouncesProps) => {
  const [open, setOpen] = useState(false);
  const [editAnnounce, setEditAnnounce] = useState<Announce | null>(null);
  const { refreshUser, currentUser } = useUser();

  const handleDelete = async (id: string) => {
    await deleteAnnounce(id);
    refreshUser();
  };

  const handleEdit = (announce: Announce) => {
    setEditAnnounce(announce);
    setOpen(true);
  };

  return (
    <div className={AnnouncesStyles.container}>
      <div className={AnnouncesStyles.header}>
        <h3 className={AnnouncesStyles.title}>Annonces</h3>
        {currentUser?._id === userId && (
          <TfiAnnouncement
            onClick={() => setOpen(true)}
            size={24}
            title="Ajouter une annonce"
            cursor={"pointer"}
            color="gold"
          />
        )}
      </div>
      <div className={AnnouncesStyles.announcesList}>
        {announces.length > 0 ? (
          [...announces]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((announce, index) => (
              <div key={index} className={AnnouncesStyles.announce}>
                <p>{announce.text}</p>

                <span className={AnnouncesStyles.date}>
                        {currentUser?._id === userId && (
                  <>
                    <LiaEdit
                      onClick={() => handleEdit(announce)}
                      size={20}
                      title="Modifier l'annonce"
                      cursor={"pointer"}
                      color="gold"
                    />
                    <MdOutlineDeleteSweep
                      onClick={() => handleDelete(announce._id)}
                      size={20}
                      title="Supprimer l'annonce"
                      cursor={"pointer"}
                      color="red"
                    />
                  </>
                        )}

                  Publiée le {new Date(announce.createdAt).toLocaleString()}
                </span>
              </div>
            ))
        ) : (
          <center>
            <p>Aucune annonce pour le moment.</p>
          </center>
        )}
      </div>
      <AnnounceModal open={open} setOpen={setOpen} userId={userId} editAnnounce={editAnnounce} />
    </div>
  );
};

export default Announces;
